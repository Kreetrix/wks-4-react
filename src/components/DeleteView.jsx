import {useRef, useEffect} from 'react';
import {useMedia} from '../hooks/apiHooks';

const DeleteView = ({item, setSelectedItem}) => {
  const dialogRef = useRef();
  const {deleteMedia} = useMedia();

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
      className="fixed inset-0 m-auto w-4/5 max-w-md p-6 rounded-md shadow-lg bg-[#35373a]"
    >
      <div className="text-center text-white space-y-4">
        <h2 className="text-2xl font-bold">Are you sure?</h2>
        <p>ARE YOU SURE?</p>
        <p className="font-semibold">{item.title}</p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => {
            const token = localStorage.getItem('token');
            deleteMedia(item.media_id, token);
            closeDialog();
          }}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white"
        >
          YES
        </button>
        <button
          onClick={closeDialog}
          className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 text-white"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
};

export default DeleteView;
