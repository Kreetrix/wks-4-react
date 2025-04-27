import {useRef, useEffect, useState} from 'react';
import {useMedia} from '../hooks/apiHooks';

const ModifyView = ({item, setSelectedItem}) => {
  const dialogRef = useRef();
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
  });

  const {modifyMedia} = useMedia();

  useEffect(() => {
    if (item) {
      setFormValues({
        title: item.title,
        description: item.description || '',
      });
      dialogRef.current?.showModal();
    }
  }, [item]);

  const closeDialog = () => {
    setSelectedItem(null);
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitChanges = async (e) => {
    e.preventDefault();
    console.log('save');
    const token = localStorage.getItem('token');
    await modifyMedia(item.media_id, formValues, token);
    closeDialog();
  };

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={closeDialog}
      className="fixed inset-0 m-auto w-4/5 max-w-2xl p-6 rounded-md shadow-lg bg-[#35373a]"
    >
      <form onSubmit={submitChanges} className="space-y-4 text-white">
        <div className="mb-4">
          {item.media_type.startsWith('image') ? (
            <img
              src={item.filename}
              alt={item.title}
              className="max-w-full max-h-[50vh] mx-auto rounded"
            />
          ) : (
            <video controls className="max-w-full max-h-[50vh] mx-auto rounded">
              <source src={item.filename} type={item.media_type} />
            </video>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formValues.title}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
            required
            minLength={3}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={formValues.description}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="flex gap-4 justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 text-white"
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeDialog}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ModifyView;
