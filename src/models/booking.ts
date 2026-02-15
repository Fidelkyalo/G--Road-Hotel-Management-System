/**
 * Represents a booking entity in the system.
 * Contains details about the reserved room, dates, guest counts, and pricing.
 */
export type Booking = {
  _id: string;
  hotelRoom: {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
  };
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
  status: string;
  review?: {
    text: string;
    userRating: number;
    _id: string;
    _createdAt: Date;
  };
};
