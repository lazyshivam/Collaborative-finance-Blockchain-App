import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  

  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace />; 
  }

  return <Outlet />; 
};

export default PrivateRoute;
