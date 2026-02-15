'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useSession } from 'next-auth/react';

import ThemeContext from '@/context/themeContext';
import Image from 'next/image';

/**
 * Header component handling navigation, theme toggling, and user session display.
 * @returns {JSX.Element} The rendered Header component.
 */
/**
 * Header component handling navigation, theme toggling, and user session display.
 * Includes logo, main navigation links, user avatar, and dark mode toggle.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  return (
    <header className='py-4 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm transition-all'>
      <div className='flex items-center w-full md:w-2/3'>
        <Link href='/' className='font-black text-tertiary-dark text-lg md:text-xl'>
          G- Road Hotel
        </Link>
        <ul className='flex items-center ml-5'>
          <li className='flex items-center'>
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className='w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden'>
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className='scale-animation img'
                    />
                  </div>
                ) : (
                  <FaUserCircle className='cursor-pointer text-2xl' />
                )}
              </Link>
            ) : (
              <Link href='/auth'>
                <FaUserCircle className='cursor-pointer text-2xl' />
              </Link>
            )}
          </li>
          <li className='ml-4'>
            {darkTheme ? (
              <MdOutlineLightMode
                className='cursor-pointer text-2xl'
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem('hotel-theme');
                }}
              />
            ) : (
              <MdDarkMode
                className='cursor-pointer text-2xl'
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem('hotel-theme', 'true');
                }}
              />
            )}
          </li>
        </ul>
      </div>

      <ul className='flex items-center justify-between w-full md:w-1/3 mt-6 md:mt-0 text-base md:text-lg'>
        <li className='hover:-translate-y-1 duration-500 transition-all'>
          <Link href='/'>Home</Link>
        </li>
        <li className='hover:-translate-y-1 duration-500 transition-all'>
          <Link href='/rooms'>Rooms</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all'>
          <Link href='#contact'>Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
