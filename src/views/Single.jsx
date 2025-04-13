import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  if (!item) {
    return <div>No media item selected</div>;
  }

  return (
    <div className="media-container">
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} className="media-content" />
      ) : (
        <video controls className="media-content">
          <source src={item.filename} type={item.media_type} />
        </video>
      )}
      <div className="media-info">
        <h2>{item.title}</h2>
        <p>{item.description || 'No description available'}</p>
        <p>Uploaded: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
        <p>Size: {(item.filesize / 1024).toFixed(1)} KB</p>
        <p>Type: {item.media_type}</p>
      </div>
      <button onClick={() => navigate(-1)} className="close-button">
        Go back
      </button>
    </div>
  );
};

export default Single;
