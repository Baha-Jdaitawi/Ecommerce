import useAuth from '../../auth/hooks/useAuth.js';

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useAuth();
  const { id, user_name, rating, comment, created_at } = review;

  return (
    <div>
      <div>
        <span>{user_name}</span>
        <span>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
      </div>
      <p>{comment}</p>
      <p>{new Date(created_at).toLocaleDateString()}</p>
      {user?.role === 'admin' && (
        <button onClick={() => onDelete(id)}>Delete</button>
      )}
    </div>
  );
};

export default ReviewCard;

