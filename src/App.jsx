import {BrowserRouter, Routes, Route} from 'react-router';
import {UserProvider} from './contexts/UserContext';
import Layout from './components/Layout';
import Home from './views/Home';
import Single from './views/Single';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Login from './views/Login';
import Logout from './views/Logout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/single" element={<Single />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
