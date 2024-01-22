/* eslint-disable react/prop-types */
import moon from "../assets/moon.svg";
import hamburger from "../assets/hamburger.svg";
import notifications from "../assets/notifications.svg";
import "../styles/header.css";
import { Categories } from "./functionbtn";

function Header({ toggleInput, toggleSideBar }) {
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
          <button>
            <img src={moon} alt="" />
          </button>
          <button>
            <img src={notifications} alt="" />
          </button>
        </div>
      </div>
      <div className="header-two">
        <div className="header-two-inner">
          <Categories toggleInput={toggleInput}/>
        </div>
      </div>
    </div>
  );
}
export default Header;
