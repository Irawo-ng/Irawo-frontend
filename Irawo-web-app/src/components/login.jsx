import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import googlelogo from "../assets/Google.svg";
import applelogo from "../assets/Apple.svg";
import { useState} from "react";
import { toast } from 'react-hot-toast';
import firebase from "../firebaseConfig";

const linkStyle = {
  color: "#968426",
  textDecoration: "none",
};

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   useEffect(() => {
  //     localStorage.setItem("authenticated", JSON.stringify(isLoggedIn));
  //   });
  let navigate = useNavigate();
  const submit = async () => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (user) {
        localStorage.setItem("authenticated", "true");
        navigate("/mainpage");
        toast.success('login successful')
      }
    } catch (error) {
        toast.error(error)
        // alert(error);
    }
  };

  return (
    <div className="loginformcontainer">
      <form action="">
        <h1>Login to your account</h1>
        <div className="inputcontainer">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="password-container">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <a href="">Forgot Password</a>
          </div>
        </div>
        <div className="btncontainer">
          <button
            className="login-btn"
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            Login
          </button>
          <p>
            Dont have an account ?{" "}
            <Link to="/authpage" style={linkStyle}>
              {" "}
              Signup
            </Link>
          </p>
        </div>
        <div className="or-separator">
          <span className="line"></span>
          <span className="or-text">OR</span>
          <span className="line"></span>
        </div>

        <div className="alt-login-methods">
          <button className="google-btn alt-login-btn">
            <img src={googlelogo} alt="" />
          </button>
          <button className="apple-btn alt-login-btn">
            <img src={applelogo} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
