import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css';
import Register from './page/register/Register';
import Login from './page/login/Login';
import Home from './page/home/Home';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftbar/Leftbar';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import Journal from './components/journal/Journal';

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
          <Navbar/>
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
          </div>
      </QueryClientProvider>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (false) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/journal",
          element: <Journal />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
