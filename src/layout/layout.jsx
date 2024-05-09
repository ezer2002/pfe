import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  // const { user, isAuthenticated, logout } = useAuth0();
  // const error = useSelector((state) => state.error);
  const userData = useSelector((data) => data.user);
  // const completeData = useSelector((state) => state.completeData);
  // const dispatch = useDispatch();

  // const [showPopup, setShowPopup] = useState(false);
  // const [intervalTime, setIntervalTime] = useState(100); // Intervalle initial de 1 minute
  // const [hasEmptyElement, sethasEmptyElement] = useState(false);

  // const resetInterval = () => {
  //   clearInterval(intervalTime);
  //   setIntervalTime(0);
  // };

  // const handleParametreChange = (newValue) => {
  //   setShowPopup(newValue);
  // };

  // useEffect(() => {
  //   console.log("from prefernces");
  //   console.log(hasEmptyElement);
  //   sethasEmptyElement(false);
  //   if (userData) {
  //     console.log(userData);
  //     if (userData.preferences.length == 0) {
  //       sethasEmptyElement(true);
  //     }
  //     userData.preferences.forEach((element) => {
  //       if (element.preferences.length == 0) {
  //         sethasEmptyElement(true);
  //         console.log("existe");
  //         console.log(element.preferences);
  //       }
  //     });
  //     console.log(hasEmptyElement);
  //   }

  //   const intervalId = setInterval(() => {
  //     setShowPopup(true);
  //   }, intervalTime);

  //   return () => clearInterval(intervalId);
  // });

  //quand le user data change abtht lel base

  // useEffect(() => {
  //   const handleUpdate = async () => {
  //     try {
  //       const response = await axios.put(
  //         `http://localhost:5000/api/public/updateUser/${userData.userId}`,
  //         userData
  //       );
  //       console.log("Update successful:", response.data);

  //     } catch (error) {
  //       console.error("Error updating user data:");

  //     }
  //   };

  //   handleUpdate()
  // }, [userData])

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
