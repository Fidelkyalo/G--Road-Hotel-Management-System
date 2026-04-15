import Image from 'next/image';

/**
 * Component to display a gallery of hotel images.
 * Renders a masonry-style or grid layout of images.
 */
const Gallery = () => {
  return (
    <div className='mx-auto container py-14 h-full px-4'>
      <div className='flex flex-wrap md:-m-2'>
        <div className='flex w-full md:w-1/2 flex-wrap'>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/bathroom.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/bedroom.avif'
              width={200}
              height={200}
            />
          </div>
          <div className='w-full p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/sitting.jpg'
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className='flex w-full md:w-1/2 flex-wrap'>
          <div className='w-full p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/kitchen.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/landing.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/corridoor.jpg'
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
