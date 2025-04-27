import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = ({setShowLogin}) => {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
            className="p-2 rounded bg-[#35373a] text-white"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            className="p-2 rounded bg-[#35373a] text-white"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
        >
          Login
        </button>
      </form>
      <button
        onClick={() => setShowLogin(false)}
        className="text-sm underline text-blue-400"
      >
        Register instead
      </button>
    </div>
  );
};

export default LoginForm;
