import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = ({setShowLogin}) => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postUser(inputs);
      console.log('Registration result:', registerResult);
      if (registerResult.message === 'user created') {
        setShowLogin(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
            className="p-2 rounded bg-[#35373a] text-white"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
            className="p-2 rounded bg-[#35373a] text-white"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
            className="p-2 rounded bg-[#35373a] text-white"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-green-600 rounded hover:bg-green-700 text-white"
        >
          Register
        </button>
      </form>
      <button
        onClick={() => setShowLogin(true)}
        className="text-sm underline text-blue-400"
      >
        Login instead
      </button>
    </div>
  );
};

export default RegisterForm;
