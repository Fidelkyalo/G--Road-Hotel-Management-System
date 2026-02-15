import Image from 'next/image';
import Link from 'next/link';

/**
 * Pre-rendered heading content for the Hero Section.
 * Contains the main title, subtitle, and CTA button.
 */
export const heading1 = (
  <>
    <h1 className='font-heading mb-6 text-4xl md:text-7xl lg:text-8xl text-white font-black tracking-widest bg-black/40 p-4 rounded-xl backdrop-blur-sm'>G- ROAD HOTEL</h1>
    <p className='text-[#ffffff] text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl font-semibold bg-black/40 p-4 rounded-xl backdrop-blur-sm'>
      Experience an Exquisite Hotel Immersed in Rich History and Timeless Elegance.
    </p>
    <Link href='/rooms' className='btn-primary inline-block text-center'>Get Started</Link>
  </>
);

/**
 * Placeholder for a second section content.
 * Currently null.
 */
export const section2 = null;
