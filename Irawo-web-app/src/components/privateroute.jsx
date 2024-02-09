/* eslint-disable react/prop-types */
import { Navigate} from "react-router-dom";

// function PrivateRoute({ Content }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const authenticate = JSON.parse(localStorage.getItem("authenticated"));
//     if (authenticate) {
//       setIsAuthenticated(authenticate);
//     } else {
//       navigate('/authpage/login');
//     }
//   }, [navigate]);

//   return isAuthenticated ? <Content /> : null;
// }

// function PrivateRoute({ Content }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const authenticate = JSON.parse(localStorage.getItem("authenticated"));
//     if (authenticate) {
//       setIsAuthenticated(authenticate);
//     }
//   }, []);
//   return isAuthenticated ? <Content/> : redirect('/authpage/login');
// }

function PrivateRoute({ children }) {
  const authenticate = localStorage.getItem("authenticated");

  if (authenticate !== null) {
    return <>{children}</>;
  } else {
    return <Navigate to="/authpage/login" />;
  }
}

export default PrivateRoute;
