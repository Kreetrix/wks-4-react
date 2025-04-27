import {useState, useEffect} from 'react';

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

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

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...inputs,
      ...file,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer: ' + token,
      },
      body: JSON.stringify(data),
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );
  };

  useEffect(() => {
    getMedia();
  }, []);

  const deleteMedia = async (id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };

    return await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${id}`,
      fetchOptions,
    );
  };

  const modifyMedia = async (id, data, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer: ' + token,
      },
      body: JSON.stringify(data),
    };

    return await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${id}`,
      fetchOptions,
    );
  };

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const res = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    console.log(res);
    return res;
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
  };

  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      body: formData,
    };

    return await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
  };

  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
