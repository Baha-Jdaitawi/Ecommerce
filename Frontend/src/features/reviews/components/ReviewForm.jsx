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
    <div className="border-t border-gray-200 pt-10">
      <h3 className="font-['Bebas_Neue'] text-3xl tracking-widest text-black mb-6">LEAVE A REVIEW</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl">

        {/* Rating */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border-2 border-black px-4 py-3 text-sm font-semibold tracking-widest uppercase outline-none focus:border-red-500 transition-colors bg-white w-full cursor-pointer"
          >
            <option value={1}>1 ★</option>
            <option value={2}>2 ★★</option>
            <option value={3}>3 ★★★</option>
            <option value={4}>4 ★★★★</option>
            <option value={5}>5 ★★★★★</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            placeholder="Share your experience..."
            className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm tracking-wide">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white font-semibold tracking-widest uppercase py-4 text-sm hover:bg-red-500 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;