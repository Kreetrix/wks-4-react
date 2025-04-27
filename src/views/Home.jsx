import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {mediaArray} = useMedia();

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Media</h2>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      <table>
        <thead className="bg-[#35373a] text-white">
          <tr>
            <th className="px-4 py-3 text-center">Thumbnail</th>
            <th className="px-4 py-3 text-center">Title</th>
            <th className="px-4 py-3 text-center">Description</th>
            <th className="px-4 py-3 text-center">Owner</th>
            <th className="px-4 py-3 text-center">Created</th>
            <th className="px-4 py-3 text-center">Size</th>
            <th className="px-4 py-3 text-center">Type</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
