import {useUserContext} from '../hooks/contextHooks';

const MediaRow = ({item, setSelectedItem}) => {
  const {user} = useUserContext();

  const isAuthorized =
    user && (user.user_id === item.user_id || user.role === 'admin');

  const handleModify = () => {
    console.log('modify', item);
  };

  const handleDelete = () => {
    console.log('delete', item);
  };

  return (
    <tr
      key={item.media_id}
      className="border-b border-gray-700 hover:bg-gray-700"
    >
      <td className="p-2">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="p-2">{item.title}</td>
      <td className="p-2">{item.description}</td>
      <td className="p-2">{item.username}</td>
      <td className="p-2">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="p-2">{(item.filesize / 1024).toFixed(1)} KB</td>
      <td className="p-2">{item.media_type}</td>
      <td className="p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedItem(item)}
            className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm w-full"
          >
            View
          </button>

          {isAuthorized && (
            <>
              <button
                onClick={handleModify}
                className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              >
                Modify
              </button>
              <button
                onClick={handleDelete}
                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;
