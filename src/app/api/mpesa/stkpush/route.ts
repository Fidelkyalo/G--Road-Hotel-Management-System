import { NextResponse } from 'next/server';
import axios from 'axios';
import { createBooking } from '@/libs/apis';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';

/**
 * Handles M-Pesa STK Push requests.
 * Initiates an M-Pesa payment transaction.
 * @param {Request} req - The incoming request object containing phone number and amount.
 * @returns {Promise<NextResponse>} JSON response with the STK push result.
 */
export async function POST(req: Request) {
    const { phoneNumber, amount, accountReference, bookingDetails } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json('Authentication required', { status: 401 });
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;
    const shortcode = process.env.MPESA_SHORTCODE;

    if (!consumerKey || !consumerSecret || !passkey || !shortcode) {
        return NextResponse.json(
            { error: 'Missing M-Pesa environment variables' },
            { status: 500 }
        );
    }

    // 1. Generate Access Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    let accessToken = '';

    try {
        const { data } = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );
        accessToken = data.access_token;
    } catch (error: any) {
        console.error('M-Pesa Auth Error:', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to authenticate with M-Pesa' }, { status: 500 });
    }

    // 2. Initiate STK Push
    const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, '')
        .slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
        'base64'
    );

    const stkPushUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const callbackUrl = process.env.MPESA_CALLBACK_URL || 'https://mydomain.com/api/mpesa/callback';

    const payload = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(amount),
        PartyA: phoneNumber,
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: accountReference,
        TransactionDesc: 'Hotel Booking',
    };

    try {
        const { data } = await axios.post(
            stkPushUrl,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // 3. Create Pending Booking if STK Push is successful
        if (data.ResponseCode === '0') {
            await createBooking({
                ...bookingDetails,
                user: session.user.id,
                totalPrice: amount, // Ensure price matches payment
                status: 'pending',
                checkoutRequestId: data.CheckoutRequestID,
            });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('STK Push Error:', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to initiate STK Push' }, { status: 500 });
    }
}
