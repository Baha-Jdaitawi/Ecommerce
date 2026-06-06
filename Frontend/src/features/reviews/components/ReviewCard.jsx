import useAuth from '../../auth/hooks/useAuth.js';

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useAuth();
  const { id, user_name, rating, comment, created_at } = review;

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white w-10 h-10 flex items-center justify-center font-bold text-sm">
            {user_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-black tracking-wide text-sm uppercase">{user_name}</p>
            <p className="text-gray-400 text-xs tracking-wide">{new Date(created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-black' : 'text-gray-300'}>★</span>
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mt-3">{comment}</p>

      {user?.role === 'admin' && (
        <button
          onClick={() => onDelete(id)}
          className="mt-3 text-xs font-semibold tracking-widest uppercase text-red-500 hover:text-red-700 transition-colors"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ReviewCard;

