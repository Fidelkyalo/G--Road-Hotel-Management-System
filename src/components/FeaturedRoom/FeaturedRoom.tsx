'use client';

import { FC } from 'react';
import Image from 'next/image';

import { Room } from '@/models/room';
import Link from 'next/link';
import { urlFor } from '@/libs/sanity';

type Props = {
  featuredRoom: Room;
};

/**
 * Component to display the featured hotel room.
 * Shows cover image, price, discount, and links to details.
 */
const FeaturedRoom: FC<Props> = props => {
  const { featuredRoom } = props;

  const coverImageUrl = featuredRoom.coverImageSanity
    ? urlFor(featuredRoom.coverImageSanity).width(500).height(500).url()
    : featuredRoom.coverImage.url;

  return (
    <section className='flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto'>
      <div className='md:grid gap-4 md:gap-8 grid-cols-1 w-full md:w-1/2'>
        <div className='rounded-2xl overflow-hidden h-40 md:h-48 mb-4 md:mb-0'>
          <Image
            src={coverImageUrl}
            alt={featuredRoom.name}
            width={500}
            height={500}
            className='img scale-animation'
          />
        </div>
        <div className='grid grid-cols-2 gap-4 md:gap-8 h-32 md:h-48'>
          {[...featuredRoom.images].splice(1, 2).map(image => (
            <div key={image._key} className='rounded-2xl overflow-hidden'>
              <Image
                src={image.url}
                alt={image._key}
                width={300}
                height={300}
                className='img scale-animation'
              />
            </div>
          ))}
        </div>
      </div>

      <div className='md:py-5 md:w-1/2 text-left'>
        <h3 className='font-heading mb-6 md:mb-12'>Featured Room</h3>

        <p className='font-normal max-w-md text-sm md:text-base'>{featuredRoom.description}</p>

        <div className='flex flex-col md:flex-row md:items-end justify-between mt-5 gap-6'>
          <div className='flex justify-between md:justify-start w-full md:w-auto'>
            <div className='flex gap-1 md:gap-3 flex-col items-center justify-center mr-4 md:mr-8'>
              <p className='text-[10px] md:text-xs lg:text-xl text-center'>Start From</p>
              <p className='md:font-bold flex font-medium text-lg md:text-2xl lg:text-3xl xl:text-5xl'>
                Ksh {featuredRoom.price.toLocaleString()}
              </p>
            </div>
            <div className='flex gap-1 md:gap-3 flex-col items-center justify-center'>
              <p className='text-[10px] md:text-xs lg:text-xl text-center'>Discount</p>
              <p className='md:font-bold flex font-medium text-lg md:text-2xl lg:text-3xl xl:text-5xl'>
                Ksh {featuredRoom.discount.toLocaleString()}
              </p>
            </div>
          </div>

          <Link
            href={`/rooms/${featuredRoom.slug.current}`}
            className='border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl'
          >
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoom;
