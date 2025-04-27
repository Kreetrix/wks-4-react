import {useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useFile} from '../hooks/apiHooks';
import {useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
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
      const fileResult = await postFile(file, token);
      console.log('File upload result:', fileResult);
      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('Media result: ' + mediaResult);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold text-white">
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            minLength={3}
            required
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold text-white">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="font-semibold text-white">
            File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            required
            className="p-2 rounded bg-gray-700 text-white file:bg-blue-500 file:border-none file:rounded file:px-4 file:py-2 file:text-white"
          />
        </div>

        <div className="flex justify-center">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://via.placeholder.com/200?text=Choose+image'
            }
            alt="preview"
            className="rounded-md w-48 h-auto"
          />
        </div>

        <button
          type="submit"
          disabled={file && inputs.title.length > 2 ? false : true}
          className="w-full py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
