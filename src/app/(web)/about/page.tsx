import React from 'react';

const AboutPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 min-h-[60vh]'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-black text-tertiary-dark mb-8'>Our Story</h1>
        
        <div className='prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300'>
          <p className='mb-6'>
            Founded with a vision to redefine luxury and comfort, G- Road Hotel began its journey as a humble guesthouse 
            and has grown into a premier destination for travelers worldwide. Our roots are deeply planted in the principles 
            of genuine hospitality, where every guest is treated like family.
          </p>
          
          <h2 className='text-2xl font-bold text-black dark:text-white mt-10 mb-4'>Our Mission</h2>
          <p className='mb-6'>
            To provide an unparalleled experience of elegance, relaxation, and bespoke service. We believe that a hotel 
            is more than just a place to sleep—it is a sanctuary where memories are forged, business is inspired, and 
            the soul is rejuvenated.
          </p>
          
          <h2 className='text-2xl font-bold text-black dark:text-white mt-10 mb-4'>Timeless Elegance Meets Modern Comfort</h2>
          <p className='mb-6'>
            Over the years, we have meticulously preserved the rich history and timeless elegance of our architecture while 
            seamlessly integrating modern amenities. From our state-of-the-art basic rooms to our lavish suites, every corner 
            of G- Road Hotel is designed with your utmost comfort in mind.
          </p>
          
          <p className='mb-6'>
            Come and experience the warmth, the luxury, and the unforgettable moments that await you at G- Road Hotel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
