'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { Booking } from '@/models/booking';

import toast from 'react-hot-toast';
import axios from 'axios';

type Props = {
  bookingDetails: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
  setRatingValue: Dispatch<SetStateAction<number | null>>;
  setRatingText: Dispatch<SetStateAction<string>>;
};

/**
 * Table component for displaying booking details.
 * Lists bookings with room name, price, discount, and status.
 */
const Table: FC<Props> = ({
  bookingDetails,
  setRoomId,
  toggleRatingModal,
  setRatingValue,
  setRatingText,
}) => {
  const router = useRouter();

  const handleVerifyPayment = async (bookingId: string) => {
    try {
      await axios.post('/api/bookings/verify', { bookingId });
      toast.success('Payment verified manually! Refreshing...');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify payment');
    }
  };

  return (
    <div className='overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className='px-6 py-3'>Room name</th>
            <th className='px-6 py-3'>Unit Price</th>
            <th className='px-6 py-3'>Price</th>
            <th className='px-6 py-3'>Discount</th>
            <th className='px-6 py-3'>Status</th>
            <th className='px-6 py-3'>No. Days Booked</th>
            <th className='px-6 py-3'>Days Left</th>
            <th className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map(booking => (
            <tr
              key={booking._id}
              className='bg-white border-b hover:bg-gray-50'
            >
              <th
                onClick={() =>
                  router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                }
                className='px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap'
              >
                {booking.hotelRoom.name}
              </th>
              <td className='px-6 py-4'>{booking.hotelRoom.price}</td>
              <td className='px-6 py-4'>{booking.totalPrice}</td>
              <td className='px-6 py-4'>{booking.discount}</td>
              <td className='px-6 py-4'>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'paid' ? 'bg-green-100 text-green-800' :
                  booking.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {booking.status ? booking.status.toUpperCase() : 'PENDING'}
                </span>
              </td>
              <td className='px-6 py-4'>{booking.numberOfDays}</td>
              <td className='px-6 py-4'>0</td>
              <td className='px-6 py-4'>
                <button
                  onClick={() => {
                    setRoomId(booking.hotelRoom._id);
                    toggleRatingModal();
                    if (booking.review) {
                      setRatingValue(booking.review.userRating);
                      setRatingText(booking.review.text);
                    } else {
                      setRatingValue(null);
                      setRatingText('');
                    }
                  }}
                  className='font-medium text-blue-600 hover:underline'
                >
                  Rate
                </button>
                {booking.status === 'pending' && (
                  <button
                    onClick={() => handleVerifyPayment(booking._id)}
                    className='ml-4 font-medium text-green-600 hover:underline'
                  >
                    Verify (Dev)
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
