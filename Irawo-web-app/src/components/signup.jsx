import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "../styles/signup.css";
import googlelogo from "../assets/Google.svg";
import applelogo from "../assets/Apple.svg";
// import firebase from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword } from "../auth";

const linkStyle = {
  color: "#968426",
  textDecoration: "none",
};

function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    usernameError: "",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

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

  const checkUsernameValidity = () => {
    const usernameInput = usernameRef.current;
    const usernameValue = usernameInput.value;
    setUserName(usernameValue);

    setErrors({ ...errors, usernameError: "" });

    if(usernameInput.validity.valueMissing){
        setErrors({...errors, usernameError: 'please input your desired username'})
    }else if(usernameInput.validity.tooShort){
        setErrors({...errors, usernameError: 'Username must be greater than five characters'})
    }
  };

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;
    const usernameInput = passwordRef.current;

    if(!usernameInput.validity.valid){
        checkUsernameValidity()
        return;
    }
    if (!emailInput.validity.valid) {
      checkEmailValidity();
      return;
    }
    if (!passwordInput.validity.valid) {
      checkPasswordValidity();
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(email, password, username)
      //console.log(user)
      if (user.status === 201) {
        navigate("/authpage/login");
        toast.success("signup successful");
      }else{
        throw new Error(user)
      }
    } catch (error) {
      toast.error(`${error}`)
    }
  };
  return (
    <div className="signupformcontainer">
      <form onSubmit={(event) => submit(event)} noValidate>
        <h1>Create your account</h1>
        <div className="inputcontainer">
          <div className="email-container i-cont">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              minLength={5}
              ref={usernameRef}
              onChange={() => {
                checkUsernameValidity()
              }}
              required
            />
            <span className="err">{errors.usernameError}</span>
          </div>
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
            <span className="err">{errors.emailError}</span>
          </div>
          <div className="email-container i-cont">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              ref={passwordRef}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={() => {
                checkPasswordValidity();
              }}
              required
            />
            <span className="err">{errors.passwordError}</span>
          </div>
        </div>
        <div className="btncontainer">
          <button
            className="signup-btn" type="submit"
          >
            Sign Up
          </button>
          <p>
            Already have an account ?{" "}
            <Link to="/authpage/login" style={linkStyle}>
              Login
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
export default SignUp;
