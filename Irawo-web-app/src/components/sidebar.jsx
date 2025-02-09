/* eslint-disable react/prop-types */
import home from "../assets/house.svg";
import profile from "../assets/profile.svg";
import history from "../assets/history.svg";
import caret from "../assets/caret.svg";
import cog from "../assets/cog.svg";
import exit from "../assets/logout.svg";
import close from "../assets/close.svg";
import userimg from "../assets/Ellipse 1.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/sidebar.css";

function SideBar({ toggleProfile, sideBar, toggleSideBar }) {
  
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/authpage/login");
    toast.success("logout successful");
  }

  return (
    <div className={sideBar ? "sidebar active" : "sidebar"}>
      <div className="profile">
        <button className="profile-btn">
          <img src={userimg} alt=""/>
          <h6>{localStorage.getItem("username")}</h6>
          <div onClick={toggleSideBar} className="closesidebar">
            <img src={close} alt="" />
          </div>
        </button>
      </div>

      <div className="navbar-container">
        <div className="navbar">
          <button className="home-btn">
            <img src={home} alt="" />
            Home
          </button>
          <button
            className="profile-btn"
            onClick={() => {
              toggleProfile()(sideBar && toggleSideBar());
            }}
          >
            <img src={profile} alt="" />
            Profile
          </button>
          <button className="history">
            <img src={history} alt="" />
            <div className="caret-div">
              History
              <img src={caret} alt="" />
            </div>
          </button>
        </div>

        <div className="settings">
          <button>
            <img src={cog} alt="" />
            Settings
          </button>
          <button style={{ color: "red" }} onClick={logout}>
            <img src={exit} alt="" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
