import {useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useFile} from '../hooks/apiHooks';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const {user} = useUserContext();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!file || !user || !token) return;

      const fileData = await postFile(file, token);

      const mediaObject = {
        title: inputs.title,
        description: inputs.description,
        filename: fileData.filename,
        filesize: fileData.filesize,
        media_type: fileData.media_type,
      };

      await postMedia(mediaObject, token);

      setFile(null);
      navigate('/');
    } catch (e) {
      console.error(e.message);
      alert('Upload failed: ' + e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            minLength={3}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 2 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
