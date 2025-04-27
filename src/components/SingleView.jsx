import {useRef, useEffect} from 'react';

const SingleView = ({item, setSelectedItem}) => {
  const dialogRef = useRef();

  useEffect(() => {
    if (item) {
      dialogRef.current?.showModal();
    }
  }, [item]);

  const closeDialog = () => {
    setSelectedItem(null);
  };

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={closeDialog}
      className="fixed inset-0 m-auto w-4/5 max-w-2xl p-6 rounded-md shadow-lg bg-[#35373a]"
    >
      <div className="mb-4">
        {item.media_type.startsWith('image') ? (
          <img
            src={item.filename}
            alt={item.title}
            className="max-w-full max-h-[60vh] mx-auto rounded"
          />
        ) : (
          <video controls className="max-w-full max-h-[60vh] mx-auto rounded">
            <source src={item.filename} type={item.media_type} />
          </video>
        )}
      </div>
      <div className="mb-4 text-white space-y-2 text-center">
        <h2 className="text-2xl font-bold">{item.title}</h2>
        <p>{item.description || 'No description available'}</p>
        <p>Uploaded: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
        <p>Size: {(item.filesize / 1024).toFixed(1)} KB</p>
        <p>Type: {item.media_type}</p>
      </div>
      <button
        onClick={closeDialog}
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white mx-auto block"
      >
        Close
      </button>
    </dialog>
  );
};

export default SingleView;
