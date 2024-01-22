/* eslint-disable react/prop-types */
import "../styles/chatsection.css";
import "../styles/modal.css";
import avatar from "../assets/Group 63.svg";
import { FaMicrophone } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { useState} from "react";
import { Modal } from "./modal";



function ChatSection({ modal, toggleProfile, inputState }) {
  const [textAreaValue, setTextAreaValue] = useState("");
  return (
    <div className="chat-section">
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>

      <div className="result-section">
        <div className="result-container">
          <div className="results">
            <div className="user-question">
              <div>
                <div className="identifier">Me</div>
              </div>
              <div className="user display-div">where is Maldives located</div>
            </div>

            <div className="ai-response">
              <div>
                <div className="identifier">Star</div>
              </div>
              <div className="display-div">
                Maldives, a country of around 550,000 people dispersed across
                185 islands, is an upper-middle-income country with a robust
                growth trajectory.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed-input-container">
        <form action="" className="propmt-form">
          <div className="prompt-container">
            <textarea
              name=""
              id="prompt"
              rows="1"
              placeholder="How can i help you today"
              disabled={inputState}
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
            ></textarea>
            <div className="btn-container">
              <button>
                <FaMicrophone color="#fff" fontSize="20px" />
              </button>
              <button disabled={textAreaValue === "" ? true : false}>
                {textAreaValue === "" ? (
                  <div className="dark" style={{ backgroundColor: "#968426" }}>
                    <LuSend color="#fff" fontSize="20px" />{" "}
                  </div>
                ) : (
                  <div className="light">
                    <LuSend color="#fff" fontSize="20px" />{" "}
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {modal ? (
        <div className="modal">
          <div className="overlay"></div>
          <Modal toggleProfile={toggleProfile} />
        </div>
      ) : null}
    </div>
  );
}
export default ChatSection;
