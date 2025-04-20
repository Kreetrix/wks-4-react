import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <div>Logging out...</div>;
};

export default Logout;
