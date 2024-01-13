import { Link} from "react-router-dom";
import { useState } from "react";
import '../styles/signup.css';
import googlelogo from '../assets/Google.svg';
import applelogo from '../assets/Apple.svg';
import firebase from  '../firebaseConfig'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const linkStyle = {
    color: '#968426',
    textDecoration: 'none'
};

function SignUp(){
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const submit = async(e) => {
        e.preventDefault()
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
            if(user){
                navigate('/authpage/login')
                toast.success('signup successful')
            }
        } catch (error) {
            alert(error)
        }
    }
    return(
        <div className="signupformcontainer">
            <form action="">
                <h1>Create your account</h1>
                <div className="inputcontainer">
                    <input type="text" placeholder="Username" name="username" value={username} onChange={(e) => {setUserName(e.target.value)}}/>
                    <input type="email" placeholder="Email address" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type="password" placeholder="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="btncontainer">
                    <button className="signup-btn" onClick={(e) => {submit(e)}}>Sign Up</button>
                    <p>
                        Already have an account ?  <Link to="/authpage/login" style={linkStyle}>Login</Link>
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
    )
}
export default SignUp