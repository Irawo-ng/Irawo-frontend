/* eslint-disable react/prop-types */
// import moon from "../assets/moon.svg";
import hamburger from "../assets/hamburger.svg";
// import notifications from "../assets/notifications.svg";
import "../styles/header.css";
import { Categories } from "./functionbtn";
import { PiSpeakerHighThin } from "react-icons/pi";
import { GiSpeakerOff } from "react-icons/gi";
import { useContext } from "react";
import { UserContext } from "./userContext";

function Header({ toggleInput, toggleSideBar }) {
  const { userState, setUserState } = useContext(UserContext);
  function updateUserState() {
    setUserState((prevState) => !prevState);
    console.log(userState);
  }

  return (
    <div className="header">
      <div className="header-one">
        <div className="burger-container">
          <button onClick={toggleSideBar}>
            {" "}
            <img src={hamburger} alt="" />{" "}
          </button>
          <h1>Irawo</h1>
        </div>
        <Categories toggleInput={toggleInput} />
        <div className="icons">
          <button onClick={updateUserState}>
            {userState ? (
              <PiSpeakerHighThin className="speaker" />
            ) : (
              <GiSpeakerOff className="speaker"/>
            )}
          </button>
        </div>
      </div>
      <div className="header-two">
        <div className="header-two-inner">
          <Categories toggleInput={toggleInput} />
        </div>
      </div>
    </div>
  );
}
export default Header;
