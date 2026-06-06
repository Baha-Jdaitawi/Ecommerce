import { useState } from 'react';
import useReviews from '../hooks/useReviews.js';

const ReviewForm = ({ product_id }) => {
  const { addReview, loading, error } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await addReview(product_id, rating, comment);
    if (data) {
      setComment('');
      setRating(5);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={1}>1 ★</option>
          <option value={2}>2 ★★</option>
          <option value={3}>3 ★★★</option>
          <option value={4}>4 ★★★★</option>
          <option value={5}>5 ★★★★★</option>
        </select>
      </div>

      <div>
        <label>Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;