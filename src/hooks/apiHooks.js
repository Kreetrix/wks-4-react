import {useState, useEffect} from 'react';

const useMedia = () => {
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
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};
