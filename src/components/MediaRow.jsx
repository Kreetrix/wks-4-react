import {Link} from 'react-router';

const MediaRow = ({item}) => {
  return (
    <tr key={item.media_id}>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.username}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{(item.filesize / 1024).toFixed(1)} KB</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="/single" state={{item}}>
          View
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
