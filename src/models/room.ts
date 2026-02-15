/**
 * Helper type for Cover Image structure.
 */
type CoverImage = {
  url: string;
};

/**
 * Represents an image asset with Sanity metadata.
 */
export type Image = {
  _key: string;
  url: string;
  uImage?: any;
};

/**
 * Represents an amenity offered in a room.
 */
type Amenity = {
  _key: string;
  amenity: string;
  icon: string;
};

/**
 * Represents a slug (URL-friendly string) for routing.
 */
type Slug = {
  _type: string;
  current: string;
};

/**
 * Represents a Hotel Room entity.
 * Comprehensive details about a room including images, price, dimensions, and availability.
 */
export type Room = {
  _id: string;
  coverImage: CoverImage;
  coverImageSanity?: any;
  description: string;
  dimension: string;
  discount: number;
  images: Image[];
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  price: number;
  slug: Slug;
  specialNote: string;
  type: string;
};

/**
 * Data Transfer Object for creating a booking.
 * Payload sent to the API to initiate a room reservation.
 */
export type CreateBookingDto = {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
  status?: string;
  checkoutRequestId?: string;
};
