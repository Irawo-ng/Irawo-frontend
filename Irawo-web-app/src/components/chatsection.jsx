/* eslint-disable react/prop-types */
import "../styles/chatsection.css";
import msg from "../assets/enter.svg";
import ai from "../assets/ai-id.svg";
import user from "../assets/user-id.svg";
import profile from "../assets/profile2.svg";
import close from "../assets/close.svg";
import { useState } from "react";
import { toast } from "react-hot-toast";
import firebase from "../firebaseConfig";

function Modal({ toggleProfile }) {
  const signedInUser = firebase.auth().currentUser;
  let [newUserName, setNewUserName] = useState("");
  let [newUserEmail, setNewUserEmail] = useState(signedInUser.email);
  let [newUserPassword, setNewUserPassword] = useState("           ");

  //   const getUserDetails = () => {
  //     if (signedInUser) {
  //       newUserEmail = signedInUser.email;
  //     }
  //   };

  const updateUsersProfile = async () => {
    const user = firebase.auth().currentUser;
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated.
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    const newEmail = await user.updateEmail(newUserEmail);
    console.log(newEmail);
    newEmail
      .then(() => {
        console.log("update successful");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="modal-content">
      <div className="modal-content-header">
        <div className="h3">Profile</div>
        <button onClick={toggleProfile}>
          <img src={close} alt="" />
        </button>
      </div>
      <hr />
      <form>
        <img src={profile} alt="" />
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            id="user-name"
            value={newUserName}
            onChange={(e) => {
              setNewUserName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={newUserEmail}
            onChange={(e) => {
              setNewUserEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={newUserPassword}
            onChange={(e) => {
              setNewUserPassword(e.target.value);
            }}
          />
        </label>

        <button
          onClick={() => {
            updateUsersProfile();
          }}
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

function ChatSection({ modal, toggleProfile }) {
  return (
    <div className="chat-section">
      <div className="result-section">
        <div className="result-container">
          <div className="user-question">
            <div>
              <img src={user} alt="" />
            </div>
            <div className="user display-div">where is Maldives located</div>
          </div>

          <div className="ai-response">
            <div>
              <img src={ai} alt="" />
            </div>
            <div className="display-div">
              Maldives, a country of around 550,000 people dispersed across 185
              islands, is an upper-middle-income country with a robust growth
              trajectory. Nestled southwest of Sri Lanka and India, Maldives is
              an archipelagic nation located in the Indian Ocean and also the
              smallest country in Asia.
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-input-container">
        <form action="" className="propmt-form">
          <div className="prompt-container">
            <textarea
              name=""
              id=""
              rows="1"
              placeholder="How can i help you today"
            ></textarea>
            <button>
              <img src={msg} alt="" />
            </button>
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
