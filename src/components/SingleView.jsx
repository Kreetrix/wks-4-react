import {useRef, useEffect} from 'react';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;
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
    <dialog ref={dialogRef} onClose={closeDialog} className="media-dialog">
      <div className="media-container">
        {item.media_type.startsWith('image') ? (
          <img src={item.filename} alt={item.title} className="media-content" />
        ) : (
          <video controls className="media-content">
            <source src={item.filename} type={item.media_type} />
          </video>
        )}
      </div>
      <div className="media-info">
        <h2>{item.title}</h2>
        <p>{item.description || 'No description available'}</p>
        <p>Uploaded: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
        <p>Size: {(item.filesize / 1024).toFixed(1)} KB</p>
        <p>Type: {item.media_type}</p>
      </div>
      <button onClick={closeDialog} className="close-button">
        Close
      </button>
    </dialog>
  );
};
export default SingleView;
