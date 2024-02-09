/* eslint-disable react/prop-types */
import userAvatar from "../assets/newuser.svg";
import aiAvatar from "../assets/lstar.svg";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./userContext";

function Userchatairesponse({
  userQuestion,
  aiAnswer,
  validateGenerating,
  negateGenerating,
  showElaborate,
  removeElaborate,
}) {
  const [displayAnswer, setDisplayAnswer] = useState("");
  const [blinkingCursor, setBlinkingCursor] = useState(true);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    let index = 0;
    const aiResponseToSpeech = () => {
      let utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };
    const text = aiAnswer || ""; // Ensure aiAnswer is not undefined or null

    const type = () => {
      // console.log(
      //   "Entering type function. Index:",
      //   index,
      //   "Text length:",
      //   text.length
      // );

      if (index < text.length) {
        //   console.log("Executing if block. Index:", index);

        setBlinkingCursor(true); // Toggle the blinking cursor
        setDisplayAnswer(text.slice(0, index));
        index++;
        validateGenerating();
        //   console.log("About to schedule next type with index:", index);
        setTimeout(type, Math.random() * 100 + 25);
      } else {
        //   console.log("Executing else if block. Index:", index);
        setDisplayAnswer(text);
        setBlinkingCursor(false); // Ensure the cursor is visible at the end
        negateGenerating();
        //   console.log("Finished generating. Index:", index);
      }
    };

    // Start typing
    if (text !== "") {
      type();
      if (userState) {
        aiResponseToSpeech();
      }
    }
    if(text === 'Elaborate'){
        showElaborate()
    }else{
        removeElaborate()
    }
    //type();

    // Cleanup function
    return () => {
      setDisplayAnswer(""); // Clear the displayed answer when component unmounts
    };
  }, [aiAnswer]);

  return (
    <div className="results">
      <div className="user-question">
        <div>
          <div className="identifier">
            <img src={userAvatar} alt="" />
          </div>
        </div>
        <div className="user display-div">{userQuestion}</div>
      </div>

      <div className="ai-response">
        <div>
          <div className="identifier">
            <img src={aiAvatar} alt="" />
          </div>
        </div>
        <div className="display-div">
          {displayAnswer}
          {blinkingCursor && <span className="blinking-cursor">|</span>}
        </div>
      </div>
    </div>
  );
}
export default Userchatairesponse;
