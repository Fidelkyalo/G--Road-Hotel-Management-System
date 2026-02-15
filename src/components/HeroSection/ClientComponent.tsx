'use client';

import { FC } from 'react';

import CountUpNumber from '../CountUpNumber/CountUpNumber';

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

/**
 * Client-side component for the Hero Section.
 * Renders the background image, heading, and animated counters.
 */
const ClientComponent: FC<Props> = props => {
  const { heading1, section2 } = props;

  return (
    <section
      className='flex px-4 items-center gap-12 container mx-auto h-screen bg-fixed bg-center bg-cover'
      style={{ backgroundImage: `url('/images/hero-1.jpeg')` }}
    >
      <div className='absolute inset-0 bg-black/30 z-0' />
      <div className='h-full flex flex-col justify-center items-center z-10 w-full text-center'>
        {heading1}

        <div className='flex justify-between mt-24 text-white gap-8 md:gap-16 bg-black/50 p-6 rounded-2xl backdrop-blur-md'>
          <div className='flex gap-3 flex-col items-center justify-center'>
            <p className='text-xs lg:text-xl text-center font-bold'>Basic Room</p>
            <CountUpNumber duration={5000} endValue={50} />
          </div>
          <div className='flex gap-3 flex-col items-center justify-center'>
            <p className='text-xs lg:text-xl text-center font-bold'>Luxury Room</p>
            <CountUpNumber duration={5000} endValue={120} />
          </div>
          <div className='flex gap-3 flex-col items-center justify-center'>
            <p className='text-xs lg:text-xl text-center font-bold'>Suite</p>
            <CountUpNumber duration={5000} endValue={60} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientComponent;
