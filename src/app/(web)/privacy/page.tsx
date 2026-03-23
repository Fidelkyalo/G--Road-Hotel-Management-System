import React from 'react';

const PrivacyPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 min-h-[60vh]'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-black text-tertiary-dark mb-8'>Our Privacy Commitment</h1>
        
        <div className='prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300'>
          <p className='mb-6'>
            At G- Road Hotel, your privacy is a top priority. We are committed to protecting your personal information 
            and ensuring that your experience with us is safe and secure.
          </p>
          
          <h3 className='text-xl font-bold text-black dark:text-white mt-8 mb-3'>1. Information We Collect</h3>
          <p className='mb-6'>
            We collect information that you provide us directly such as your name, email address, phone number, and 
            payment information when booking our services or creating an account.
          </p>
          
          <h3 className='text-xl font-bold text-black dark:text-white mt-8 mb-3'>2. How We Use Your Information</h3>
          <p className='mb-6'>
            Your information is used strictly to provide you with exceptional hotel services, to process payments securely, 
            and to communicate with you regarding your bookings. We do not sell or rent your personal data to third parties.
          </p>
          
          <h3 className='text-xl font-bold text-black dark:text-white mt-8 mb-3'>3. Data Security</h3>
          <p className='mb-6'>
            We implement state-of-the-art security measures to maintain the safety of your personal information. All 
            transactions are processed through a gateway provider and are not stored or processed on our servers.
          </p>
          
          <p className='mt-10 font-medium'>
            Last Updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
