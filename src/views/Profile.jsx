import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <div className="p-4 space-y-4 text-white">
      <h2 className="text-2xl font-bold">Profile</h2>
      {user ? (
        <div className="space-y-2">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created at: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
