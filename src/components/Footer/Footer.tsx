import Link from 'next/link';
import { BsFillSendFill, BsTelephoneOutbound } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';

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
        <Link href='/' className='font-black text-tertiary-dark'>
          G- Road Hotel
        </Link>

        <h4 className='font-semibold text-[40px] py-6' id='contact'>Contact</h4>

        <div className='flex flex-wrap gap-8 md:gap-16 items-start justify-between'>
          <div className='w-full md:flex-1'>
            <p className='font-bold text-lg'>G- Road Hotel</p>
            <div className='flex items-center py-2 md:py-4'>
              <BsFillSendFill />
              <p className='ml-2 text-sm md:text-base'>info@g-roadhotel.com</p>
            </div>
            <div className='flex items-center'>
              <BsTelephoneOutbound />
              <p className='ml-2 text-sm md:text-base'>+254112063383</p>
            </div>
          </div>

          <div className='w-1/2 md:flex-1 md:text-right text-sm md:text-base'>
            <p className='pb-2 md:pb-4'>Our Story</p>
            <p className='pb-2 md:pb-4'>Get in Touch</p>
            <p className='pb-2 md:pb-4'>Our Privacy Commitment</p>
            <p className='pb-2 md:pb-4'>Terms of service</p>
            <p>Customer Assistance</p>
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

      <div className='bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0' />
    </footer>
  );
};

export default Footer;
