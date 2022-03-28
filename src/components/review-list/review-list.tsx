import { SubmitStatus } from '../../const';
import type { Comment, NewComment } from '../../types/types';

import ReviewForm from '../review-form/review-form';
import Review from '../review/review';

type ReviewListProps = {
    reviews: Comment[];
    isAuthorized: boolean;
    onSubmit: (formData: NewComment) => void;
    submitStatus: SubmitStatus;
}

const ReviewList = ({ reviews, isAuthorized, onSubmit, submitStatus }: ReviewListProps) => (
  <section className="property__reviews reviews">
    {reviews.length > 0 && (
      <>
        <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">{reviews.length}</span>
        </h2>
        <ul className="reviews__list">
          {reviews.map((review) => (
            <Review key={review.id} {...review} />
          ))}
        </ul>
      </>)}
    {isAuthorized && <ReviewForm onSubmit={onSubmit} submitStatus={submitStatus} />}
  </section>
);

export default ReviewList;
