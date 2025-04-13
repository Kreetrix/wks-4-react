import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  const getMedia = async () => {
    try {
      const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
      const mediaData = await fetchData(mediaUrl);

      const newArray = await Promise.all(
        mediaData.map(async (item) => {
          const userUrl =
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id;
          const userData = await fetchData(userUrl);
          return {...item, username: userData.username};
        }),
      );

      setMediaArray(newArray);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
