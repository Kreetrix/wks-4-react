import {useState, useEffect} from 'react';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({mediaId}) => {
  const [likes, setLikes] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const {getLikesByMediaId, postLike, deleteLike} = useLike();
  const {user} = useUserContext();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getLikesByMediaId(mediaId);
        setLikes(likesData);

        if (user) {
          const hasLiked = likesData.some(
            (like) => like.user_id === user.user_id,
          );
          setUserLiked(hasLiked);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [mediaId, user]);

  const handleLikeToggle = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem('token');

      if (userLiked) {
        const userLike = likes.find((like) => like.user_id === user.user_id);
        if (userLike) {
          await deleteLike(userLike.like_id, token);
          setUserLiked(false);
          setLikes(likes.filter((like) => like.user_id !== user.user_id));
        }
      } else {
        const newLike = await postLike(mediaId, token);
        setUserLiked(true);
        setLikes([...likes, newLike]);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLikeToggle}
        disabled={!user}
        className={`flex items-center gap-1 px-3 py-1 rounded ${
          userLiked
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gray-500 hover:bg-gray-600'
        } ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span>♥</span>
        <span>{userLiked ? 'Liked' : 'Like'}</span>
      </button>
      <span>
        {likes.length} {likes.length === 1 ? 'like' : 'likes'}
      </span>
    </div>
  );
};

export default Likes;
