import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navigation/navbar";

export default function Layout() {
  const location = useLocation();


  const userData = useSelector((data) => data.user);
 

  return (
    <>
      {userData ? (
        
        <Navigate to="/calendar" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
}
