import {Link, Outlet} from 'react-router';
import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="mx-[150px] flex flex-col text-center items-center">
      <nav className="bg-[#0076cb65] p-4">
        <ul className="flex list-none m-0 p-0 gap-4">
          <li>
            <Link className="text-white no-underline hover:underline" to="/">
              Home
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  className="text-white no-underline hover:underline"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline hover:underline"
                  to="/upload"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline hover:underline"
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link
                className="text-white no-underline hover:underline"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main className="m-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
