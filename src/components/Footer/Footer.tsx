import Link from 'next/link';
import Image from 'next/image';
import { BsFillSendFill, BsTelephoneOutbound, BsWhatsapp } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

/**
 * Footer component displaying contact information and links.
 * @returns {JSX.Element} The rendered Footer component.
 */
/**
 * Footer component displaying contact information and links.
 * Renders the hotel's contact details, story links, and copyright.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <footer className='mt-16'>
      <div className='container mx-auto px-4'>
        <Link href='/' className='font-black text-tertiary-dark flex items-center gap-2 text-xl'>
          <Image src='/images/LOGO.png' alt='G- Road Hotel Logo' width={40} height={40} className='w-10 h-10' />
          G- Road Hotel
        </Link>

        <h4 className='font-semibold text-[40px] py-6'>Contact</h4>

        <div className='flex flex-wrap gap-8 md:gap-16 items-start justify-between'>
          <div className='w-full md:flex-1'>
            <p className='font-bold text-lg'>G- Road Hotel</p>
            <div className='flex items-center py-2 md:py-4'>
              <BsFillSendFill />
              <p className='ml-2 text-sm md:text-base'>info-groadhotel@gmail.com</p>
            </div>
            <div className='flex items-center'>
              <BsTelephoneOutbound />
              <p className='ml-2 text-sm md:text-base'>+254102039121</p>
            </div>
            <div className='flex items-center py-2 md:py-4'>
              <HiOutlineLocationMarker className='text-lg' />
              <p className='ml-2 text-sm md:text-base'>Along Garissa Road, Nairobi, Kenya</p>
            </div>
            <div className='flex items-center py-2 md:py-4'>
              <BsWhatsapp className='text-green-500' />
              <a href='https://wa.me/254102039121' target='_blank' rel='noopener noreferrer' className='ml-2 text-sm md:text-base hover:text-green-500 font-bold transition-all'>
                WhatsApp Status
              </a>
            </div>
          </div>

          <div className='w-1/2 md:flex-1 md:text-right text-sm md:text-base'>
            <Link href='/about' className='pb-2 md:pb-4 block hover:text-tertiary-dark transition-all'>Our Story</Link>
            <Link href='/contact' className='pb-2 md:pb-4 block hover:text-tertiary-dark transition-all'>Get in Touch</Link>
            <Link href='/privacy' className='pb-2 md:pb-4 block hover:text-tertiary-dark transition-all'>Our Privacy Commitment</Link>
            <Link href='/terms' className='pb-2 md:pb-4 block hover:text-tertiary-dark transition-all'>Terms of service</Link>
            <Link href='/support' className='block hover:text-tertiary-dark transition-all'>Customer Assistance</Link>
          </div>

          <div className='w-1/2 md:flex-1 md:text-right text-sm md:text-base'>
            <p className='pb-2 md:pb-4'>Dining Experience</p>
            <p className='pb-2 md:pb-4'>Wellness</p>
            <p className='pb-2 md:pb-4'>Fitness</p>
            <p className='pb-2 md:pb-4'>Sports</p>
            <p>Events</p>
          </div>
        </div>
      </div>

      <div className='bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0 flex items-center justify-center text-white text-xs md:text-sm font-semibold'>
        G- ROAD HOTEL MANAGEMENT SYSTEM || ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
