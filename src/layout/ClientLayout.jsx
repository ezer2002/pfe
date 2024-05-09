import { useLocation, Navigate, Outlet } from "react-router-dom";

import { connect, useDispatch, useSelector } from "react-redux";



export default function ClientLayout() {
  const userData=useSelector(data=>data.user)
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const location = useLocation();



  return (
    <>
   
  
        {userData ?
         <Outlet />: 
         <Navigate to="/login" state={{ from: location }} replace />}  
      
    
    
  </>
  );
}

