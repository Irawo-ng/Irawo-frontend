import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import googlelogo from "../assets/Google.svg";
import applelogo from "../assets/Apple.svg";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import firebase from "../firebaseConfig";

const linkStyle = {
  color: "#968426",
  textDecoration: "none",
};

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const checkEmailValidity = () => {
    const emailInput = emailRef.current;
    const inputValue = emailInput.value;
    setEmail(inputValue);

    setErrors({ ...errors, emailError: "" });
    if (emailInput.validity.valueMissing) {
      setErrors({ ...errors, emailError: "Email field cannot be empty" });
    } else if (emailInput.validity.typeMismatch) {
      setErrors({ ...errors, emailError: "please enter a valid email" });
    }
  };
  const checkPasswordValidity = () => {
    const passwordInput = passwordRef.current;
    const passwordValue = passwordInput.value;
    setPassword(passwordValue);

    setErrors({ ...errors, passwordError: "" });
    if (passwordInput.validity.valueMissing) {
      setErrors({ ...errors, passwordError: "password field cannot be empty" });
    } else if (passwordInput.validity.patternMismatch) {
      setErrors({
        ...errors,
        passwordError:
          "Password must be greater than 8 characters, contain a number, a special character and an uppercase character",
      });
    }
  };

  let navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;

    if (!emailInput.validity.valid) {
      checkEmailValidity();
      return;
    }
    if (!passwordInput.validity.valid) {
      checkPasswordValidity();
      return;
    }

    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (user) {
        localStorage.setItem("authenticated", "true");
        navigate("/mainpage");
        toast.success("login successful");
      }
    } catch (error) {
      toast.error(`${error}`);
      // toast.error("Login failed. Please check your credentials.");
      // console.log('LOgin error', error)
      // alert(error);
    }
  };

  return (
    <div className="loginformcontainer">
      <form onSubmit={(event) => submit(event)} noValidate>
        <h1>Login to your account</h1>
        <div className="inputcontainer">
          <div className="email-container i-cont">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              ref={emailRef}
              onChange={() => {
                checkEmailValidity();
              }}
              required
            />
            <span className="email-err err">{errors.emailError}</span>
          </div>
          <div className="password-container i-cont">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              value={password}
              ref={passwordRef}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={() => {
                checkPasswordValidity();
              }}
              required
            />
            <span className="password-err err">{errors.passwordError}</span>
            <a href="">Forgot Password</a>
          </div>
        </div>
        <div className="btncontainer">
          <button className="login-btn" type="submit">
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
