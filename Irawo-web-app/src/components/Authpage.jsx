import { Outlet } from "react-router-dom";
import ai from '../assets/ai.svg';
import '../styles/authpage.css';



function Authpage(){

    return(
        <div className="auth-page">
            <div className="ai">
                <img src={ai} alt="" />
            </div>
            <div className="authentication">
                <h1>Irawo</h1>
                <Outlet/>
            </div>
        </div>
    )
}
export default Authpage