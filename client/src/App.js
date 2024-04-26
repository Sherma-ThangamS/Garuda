import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css';
import Register from './page/register/Register';
import Login from './page/login/Login';
import Home from './page/home/Home';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import Journal from './components/journal/Journal';
import Sidebar from './components/sidebar/Sidebar';
import ProjectForm from './page/projects/Projects';
import PatentForm from './page/patent/Patent'
import PublicationForm from './page/publication/Publication';
import Navbar from './page/home/Navbar';

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
              <Navbar />
              <div className='layout'>
                <Sidebar/>
                <div className='form'>
                  <Outlet/>
                </div>
              </div>
      </QueryClientProvider>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
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
        {
          path: "/patents",
          element: <PatentForm/>,
        },
        {
          path: "/projects",
          element: <ProjectForm/>,
        },
        {
          path: "/publications",
          element: <PublicationForm/>,
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
