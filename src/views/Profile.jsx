import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created at: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </>
  );
};

export default Profile;
