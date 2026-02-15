import { CreateReviewDto, Review } from './../models/review';
import axios from 'axios';

import { CreateBookingDto, Room } from '@/models/room';
import sanityClient from './sanity';
import * as queries from './sanityQueries';
import { Booking } from '@/models/booking';
import { UpdateReviewDto } from '@/models/review';

/**
 * Fetches the featured room from Sanity CMS.
 * @returns {Promise<Room>} A promise that resolves to the featured Room object.
 */
export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
  );

  return result;
}

/**
 * Fetches all rooms from Sanity CMS.
 * @returns {Promise<Room[]>} A promise that resolves to an array of Room objects.
 */
export async function getRooms() {
  console.log('Fetching rooms initiated...');
  try {
    const result = await sanityClient.fetch<Room[]>(
      queries.getRoomsQuery,
      {},
      { cache: 'no-cache' }
    );
    console.log('Fetching rooms success:', result);
    return result;
  } catch (error) {
    console.error('Fetching rooms failed:', error);
    throw error;
  }
}

/**
 * Fetches a specific room by its slug.
 * @param {string} slug - The slug of the room to fetch.
 * @returns {Promise<Room>} A promise that resolves to the Room object.
 */
export async function getRoom(slug: string) {
  console.log('Fetching room initiated with slug:', slug);
  try {
    const result = await sanityClient.fetch<Room>(
      queries.getRoom,
      { slug },
      { cache: 'no-cache' }
    );
    console.log('Fetching room success:', result);
    return result;
  } catch (error) {
    console.error('Fetching room failed:', error);
    throw error;
  }
}

/**
 * Creates a new booking in Sanity CMS.
 * @param {CreateBookingDto} bookingData - The data for the new booking.
 * @returns {Promise<any>} A promise that resolves to the result of the mutation.
 */
export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
  status = 'pending',
  checkoutRequestId,
}: CreateBookingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'booking',
          user: { _type: 'reference', _ref: user },
          hotelRoom: { _type: 'reference', _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
          status,
          checkoutRequestId,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

/**
 * Updates a hotel room's status to booked.
 * @param {string} hotelRoomId - The ID of the hotel room to update.
 * @returns {Promise<any>} A promise that resolves to the result of the mutation.
 */
export const updateHotelRoom = async (hotelRoomId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: hotelRoomId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

/**
 * Fetches bookings for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Booking[]>} A promise that resolves to an array of Booking objects.
 */
export async function getUserBookings(userId: string) {
  const result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
}

/**
 * Fetches user data by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any>} A promise that resolves to the user data.
 */
export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: 'no-cache' }
  );

  return result;
}

/**
 * Checks if a review already exists for a specific user and hotel room.
 * @param {string} userId - The ID of the user.
 * @param {string} hotelRoomId - The ID of the hotel room.
 * @returns {Promise<null | { _id: string }>} A promise that resolves to the review ID if it exists, or null.
 */
export async function checkReviewExists(
  userId: string,
  hotelRoomId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && hotelRoom._ref == $hotelRoomId][0] {
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

/**
 * Checks if a user has a valid booking for a specific hotel room.
 * @param {string} userId - The ID of the user.
 * @param {string} hotelRoomId - The ID of the hotel room.
 * @returns {Promise<boolean>} A promise that resolves to true if a booking exists, or false.
 */
export async function checkUserHasBooking(
  userId: string,
  hotelRoomId: string
): Promise<boolean> {
  const query = `*[_type == 'booking' && user._ref == $userId && hotelRoom._ref == $hotelRoomId][0] {
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  const result = await sanityClient.fetch(query, params);

  return !!result;
}

/**
 * Updates an existing review.
 * @param {UpdateReviewDto} reviewData - The data to update the review with.
 * @returns {Promise<any>} A promise that resolves to the result of the mutation.
 */
export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

/**
 * Creates a new review for a hotel room.
 * @param {CreateReviewDto} reviewData - The data for the new review.
 * @returns {Promise<any>} A promise that resolves to the result of the mutation.
 */
export const createReview = async ({
  hotelRoomId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'review',
          user: {
            _type: 'reference',
            _ref: userId,
          },
          hotelRoom: {
            _type: 'reference',
            _ref: hotelRoomId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

/**
 * Fetches reviews for a specific room.
 * @param {string} roomId - The ID of the room.
 * @returns {Promise<Review[]>} A promise that resolves to an array of Review objects.
 */
export async function getRoomReviews(roomId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      roomId,
    },
    { cache: 'no-cache' }
  );

  return result;
}

/**
 * Updates a booking's status.
 * @param {string} bookingId - The ID of the booking to update.
 * @param {string} status - The new status.
 * @returns {Promise<any>} A promise that resolves to the result of the mutation.
 */
export const updateBooking = async (bookingId: string, status: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: bookingId,
          set: {
            status,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};
