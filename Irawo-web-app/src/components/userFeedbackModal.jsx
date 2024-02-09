/* eslint-disable react/prop-types */
import close from "../assets/close.svg";
import { FaTrophy } from "react-icons/fa6";
import "../styles/feedback.css";
export function FeedbackModal({ message, closeModal }) {
  return (
    <div className="feedbackmessage">
      <div className="close-header">
        <button onClick={closeModal}>
          <img src={close} alt="" />
        </button>
      </div>
      <div className="message">
      <FaTrophy className="trophy"/>
        {message}
        </div>
    </div>
  );
}
