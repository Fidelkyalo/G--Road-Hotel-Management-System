'use client';

import { FC, useState } from 'react';
import { BsFillSendFill, BsTelephoneOutbound, BsWhatsapp } from 'react-icons/bs';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import axios from 'axios';

const Contact: FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axios.post('/api/contact', formData);
            toast.success(data.message || 'Message sent! We will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error: any) {
            console.error('Error sending message:', error);
            toast.error(error.response?.data || 'Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container mx-auto px-4 py-16'>
            <div className='text-center mb-16'>
                <h1 className='font-heading mb-4 text-white bg-tertiary-dark inline-block px-8 py-2 rounded-xl'>Get in Touch</h1>
                <p className='font-normal text-gray-500 max-w-2xl mx-auto'>
                    Have questions about our rooms or services? We're here to help you experience the best of G- Road Hotel.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* Contact Form */}
                <div className='bg-white dark:bg-black/50 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-md'>
                    <h2 className='text-2xl font-bold mb-8'>Send us a Message</h2>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium mb-2'>Full Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-tertiary-dark outline-none transition-all'
                                placeholder='John Doe'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium mb-2'>Email Address</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-tertiary-dark outline-none transition-all'
                                placeholder='john@example.com'
                            />
                        </div>
                        <div>
                            <label htmlFor='message' className='block text-sm font-medium mb-2'>Your Message</label>
                            <textarea
                                id='message'
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className='w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-tertiary-dark outline-none transition-all resize-none'
                                placeholder='How can we help you?'
                            ></textarea>
                        </div>
                        <button
                            disabled={isLoading}
                            type='submit'
                            className='btn-primary w-full flex items-center justify-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all'
                        >
                            {isLoading ? 'Sending...' : <><BsFillSendFill /> Send Message</>}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className='flex flex-col justify-center space-y-8'>
                    <div className='bg-tertiary-light/10 p-8 rounded-3xl border border-tertiary-light/20'>
                        <h2 className='text-2xl font-bold mb-8 text-tertiary-dark'>Contact Information</h2>
                        <div className='space-y-6'>
                            <div className='flex items-start gap-4'>
                                <div className='bg-tertiary-dark text-white p-3 rounded-xl'>
                                    <HiOutlineLocationMarker className='text-xl' />
                                </div>
                                <div>
                                    <h3 className='font-bold'>Our Location</h3>
                                    <p className='text-gray-500'>Along Garissa Road, Nairobi, Kenya</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='bg-primary text-white p-3 rounded-xl'>
                                    <BsTelephoneOutbound className='text-xl' />
                                </div>
                                <a href='tel:+254102039121' className='hover:underline'>
                                    <h3 className='font-bold'>Phone Number</h3>
                                    <p className='text-gray-500'>+254 102 039121</p>
                                </a>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='bg-tertiary-dark text-white p-3 rounded-xl'>
                                    <HiOutlineMail className='text-xl' />
                                </div>
                                <a href='mailto:info@g-roadhotel.com' className='hover:underline'>
                                    <h3 className='font-bold'>Email Us</h3>
                                    <p className='text-gray-500'>info@g-roadhotel.com</p>
                                </a>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='bg-[#25D366] text-white p-3 rounded-xl shadow-lg hover:scale-110 transition-transform'>
                                    <BsWhatsapp className='text-xl' />
                                </div>
                                <a
                                    href='https://wa.me/254102039121'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='hover:underline text-green-600 font-bold'
                                >
                                    <h3 className='font-bold'>WhatsApp</h3>
                                    <p className='text-gray-500'>Chat with us now</p>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='p-8 rounded-3xl bg-black text-white overflow-hidden relative'>
                        <div className='relative z-10'>
                            <h2 className='text-2xl font-bold mb-4'>Open 24/7</h2>
                            <p className='text-gray-400'>We are always available for bookings and inquiries. Visit us anytime!</p>
                        </div>
                        <div className='absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
