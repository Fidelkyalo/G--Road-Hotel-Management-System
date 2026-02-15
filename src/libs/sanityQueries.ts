import { groq } from 'next-sanity';

/**
 * Query to fetch the featured room details.
 * Selects fields required for displaying the featured section.
 */
export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage,
    coverImageSanity
}`;

/**
 * Query to fetch all hotel rooms with basic info.
 * Used for listing rooms on the main page.
 */
export const getRoomsQuery = groq`*[_type == "hotelRoom"] {
    _id, 
    coverImage,
    coverImageSanity,
    description,
    dimension,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

/**
 * Query to fetch a single room with detailed info by slug.
 * Used for the room details page.
 */
export const getRoom = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    dimension,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    numberOfBeds,
    offeredAmenities,
    price,
    slug,
    specialNote,
    specialNote,
    type,
    coverImageSanity
}`;

/**
 * Query to fetch bookings for a specific user.
 * Filters by user reference ID.
 */
export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    hotelRoom -> {
        _id,
        name,
        slug,
        price
    },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount,
    status,
    "review": *[_type == "review" && hotelRoom._ref == ^.hotelRoom._ref && user._ref == $userId][0] {
        text,
        userRating,
        _id,
        _createdAt
    }
}`;

/**
 * Query to fetch user profile data.
 * Retrieves name, email, admin status, and image.
 */
export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;

/**
 * Query to fetch reviews for a specific room.
 * Includes user details using projection.
 */
export const getRoomReviewsQuery = groq`*[_type == "review" && hotelRoom._ref == $roomId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}
`;

/**
 * Query to fetch a booking by its M-Pesa Checkout Request ID.
 */
export const getBookingByCheckoutRequestId = groq`*[_type == "booking" && checkoutRequestId == $checkoutRequestId][0] {
    _id,
}`;
