/**
 * Data Transfer Object for updating an existing review.
 * Used when a user edits their review text or rating.
 */
export type UpdateReviewDto = {
  reviewId: string;
  reviewText: string;
  userRating: number;
};

/**
 * Data Transfer Object for creating a new review.
 * Required payload for submitting a review for a hotel room.
 */
export type CreateReviewDto = {
  hotelRoomId: string;
  reviewText: string;
  userRating: number;
  userId: string;
};

/**
 * Represents a Review entity.
 * Contains the review content, author name, rating, and creation timestamp.
 */
export type Review = {
  text: string;
  user: { name: string };
  userRating: number;
  _createdAt: Date;
  _id: string;
};
