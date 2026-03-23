import React from 'react';
import Link from 'next/link';
import { BsTelephoneOutbound, BsFillSendFill, BsWhatsapp } from 'react-icons/bs';

const SupportPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 min-h-[60vh]'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-black text-tertiary-dark mb-8'>Customer Assistance</h1>
        
        <div className='prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-10'>
          <p className='mb-6'>
            We are here to help! Whether you have questions about a recent booking, need assistance planning your stay, 
            or want to report an issue, our dedicated customer support team is available 24/7.
          </p>
          
          <h2 className='text-2xl font-bold text-black dark:text-white mt-10 mb-6'>Ways to Reach Us</h2>
          
          <div className='grid md:grid-cols-2 gap-6 not-prose'>
            <div className='p-6 bg-[#eff0f2] dark:bg-gray-800 rounded-xl shadow-sm'>
              <BsTelephoneOutbound className='text-3xl text-tertiary-dark mb-4' />
              <h3 className='font-bold text-xl mb-2 text-black dark:text-white'>Phone Support</h3>
              <p className='text-sm mb-4'>Call us directly for immediate assistance with your reservations.</p>
              <p className='font-bold text-lg'>+254 102 039 121</p>
            </div>
            
            <div className='p-6 bg-[#eff0f2] dark:bg-gray-800 rounded-xl shadow-sm'>
              <BsFillSendFill className='text-3xl text-tertiary-dark mb-4' />
              <h3 className='font-bold text-xl mb-2 text-black dark:text-white'>Email Support</h3>
              <p className='text-sm mb-4'>Drop us an email. We typically respond within 24 hours.</p>
              <p className='font-bold text-lg'>info-groadhotel@gmail.com</p>
            </div>

            <div className='p-6 bg-[#eff0f2] dark:bg-gray-800 rounded-xl shadow-sm'>
              <BsWhatsapp className='text-3xl text-green-500 mb-4' />
              <h3 className='font-bold text-xl mb-2 text-black dark:text-white'>WhatsApp</h3>
              <p className='text-sm mb-4'>Chat with us directly via WhatsApp for quick inquiries.</p>
              <a href='https://wa.me/254102039121' target='_blank' rel='noopener noreferrer' className='font-bold text-lg text-green-600 hover:underline'>
                Message Us
              </a>
            </div>
          </div>
        </div>

        <Link href='/contact' className='btn-primary inline-block text-center mt-6'>
          Go to Contact Form
        </Link>
      </div>
    </div>
  );
};

export default SupportPage;
