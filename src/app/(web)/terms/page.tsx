import React from 'react';

const TermsPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 min-h-[60vh]'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-black text-tertiary-dark mb-8'>Terms of Service</h1>
        
        <div className='prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300'>
          <p className='mb-6'>
            Please read these Terms of Service carefully before using our website or booking a stay at G- Road Hotel.
          </p>
          
          <h3 className='text-xl font-bold text-black dark:text-white mt-8 mb-3'>Acceptance of Terms</h3>
          <p className='mb-6'>
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, 
            you may not access the service.
          </p>
          
          <h3 className='text-xl font-bold text-black dark:text-white mt-8 mb-3'>Bookings & Cancellations</h3>
          <p className='mb-6'>
            All bookings are subject to availability. Cancellations must be made at least 48 hours prior to your scheduled check-in 
            time to receive a full refund. Cancellations made after this period may be subject to a fee.
          </p>
          
          <h3 className='text-xl font-bold text-black dark:text-white mt-8 mb-3'>House Rules</h3>
          <p className='mb-6'>
            Guests are expected to conduct themselves in a respectful manner. Any damage to hotel property will be charged to the 
            credit card on file or requested manually. Smoking is strictly prohibited in our rooms and indoor public areas.
          </p>

          <p className='mt-10 font-medium'>
            For further inquiries regarding our terms, please contact our support desk.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
