/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import firebase from "../firebaseConfig";
import "firebase/auth";
import { SHA256 } from "crypto-js";
import profile from "../assets/profile2.svg";
import close from "../assets/close.svg";

export function Modal({ toggleProfile }) {
    // const signedInUser = firebase.auth().currentUser;
    const [signedInUser, setSignedInUser] = useState(null);
    let [currentPassword, setCurrentPassword] = useState("");
    let [newUserName, setNewUserName] = useState("");
    let [newUserEmail, setNewUserEmail] = useState("");
    let [newUserPassword, setNewUserPassword] = useState("");
  
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        setSignedInUser(user);
      });
  
      return () => unsubscribe();
    }, []);
  
    const updateEmail = (email) => {
      return signedInUser.updateEmail(email);
    };
  
    // const updatePassword = (password) => {
    //   return signedInUser.updatePassword(password)
    // }
  
    const updatePassword = async (password) => {
      try {
        // Hash the user's current password on the client side
        const hashedCurrentPassword = SHA256(currentPassword);
  
        // Re-authenticate the user with the hashed password
        const user = firebase.auth().currentUser;
        const credential = await firebase.auth.EmailAuthProvider.credential(
          user.email,
          hashedCurrentPassword.toString()
        );
  
        return await user.reauthenticateWithCredential(credential).then(() => {
          user.updatePassword(password);
          console.log("Password updated successfully");
        });
      } catch (error) {
        console.error("Error updating password:", error.message);
        alert(error.message);
      }
    };
  
    const updateProfile = async (e) => {
      e.preventDefault();
      try {
        const promises = [];
        if (newUserPassword.trim() !== "") {
          promises.push(updatePassword(newUserPassword.trim()));
        }
        if (newUserEmail.trim() !== "") {
          promises.push(updateEmail(newUserEmail.trim()));
        }
  
        await Promise.all(promises);
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert(error.message);
      }
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
          <label htmlFor="current-password">
            current Password
            <input
              type="password"
              name="current-password"
              id="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            New Password
            <input
              type="password"
              name="password"
              id="new-password"
              value={newUserPassword}
              onChange={(e) => {
                setNewUserPassword(e.target.value);
              }}
            />
          </label>
  
          <button
            onClick={(e) => {
              updateProfile(e);
            }}
          >
            Save changes
          </button>
        </form>
      </div>
    );
  }