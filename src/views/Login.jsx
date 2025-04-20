import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <LoginForm setShowLogin={setShowLogin} />
      ) : (
        <RegisterForm setShowLogin={setShowLogin} />
      )}
    </>
  );
};

export default Login;
