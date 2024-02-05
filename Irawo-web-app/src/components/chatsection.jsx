/* eslint-disable react/prop-types */
import "../styles/chatsection.css";
import "../styles/modal.css";
import avatar from "../assets/Group 63.svg";
import { FaMicrophone } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { useState, useEffect } from "react";
import { Modal } from "./modal";

function Userchatairesponse({
  userQuestion,
  aiAnswer,
  validateGenerating,
  negateGenerating
}) {
  const [displayAnswer, setDisplayAnswer] = useState("");
  const [blinkingCursor, setBlinkingCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const text = aiAnswer || ""; // Ensure aiAnswer is not undefined or null

    const type = () => {
      console.log('Entering type function. Index:', index, 'Text length:', text.length);

      if (index < text.length) {
        console.log('Executing if block. Index:', index);

        setBlinkingCursor(true); // Toggle the blinking cursor
        setDisplayAnswer(text.slice(0, index));
        index++;
        validateGenerating()
        console.log('About to schedule next type with index:', index);
        setTimeout(type, Math.random() * 150 + 50);
      } else {
        console.log('Executing else if block. Index:', index);
        setDisplayAnswer(text);
        setBlinkingCursor(false); // Ensure the cursor is visible at the end
        negateGenerating()
        console.log('Finished generating. Index:', index);
      }
    };

    // Start typing
    if(text !== ''){
      type()
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
          <div className="identifier">Me</div>
        </div>
        <div className="user display-div">{userQuestion}</div>
      </div>

      <div className="ai-response">
        <div>
          <div className="identifier">Star</div>
        </div>
        <div className="display-div">
          {displayAnswer}
          {blinkingCursor && <span className="blinking-cursor">|</span>}
        </div>
      </div>
    </div>
  );
}


function ChatSection({ modal, toggleProfile, inputState }) {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [conversations, setConversations] = useState([]);
  const [generating, setGenerating] = useState(false)

  const analyzeUserSpeech = (e) => {
    e.preventDefault();

    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition();

    recognition.onstart = () => {
      console.log("Speak in microphone");
    };
    recognition.onspeechend = () => {
      console.log("stopped listening");
      recognition.stop();
    };
    recognition.onresult = (result) => {
      let vocalInput = result.results[0][0].transcript;
      console.log(vocalInput);
    };
    recognition.start();
  };

  const generateAiResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const aiResponse =
          "Maldives, a country of around 550,000 people dispersed across 185 islands, is an upper-middle-income country with a robust growth trajectory.";
        resolve(aiResponse);
      }, 5000);
    });
  };

  const negateGenerating = () => {
    setGenerating(false)
  }
  const validateGenerating = () => {
    setGenerating(true)
  }

  const sendUserQuestion = async (e) => {
    e.preventDefault();
    setGenerating(true)

    const newQuestion = textAreaValue;

    const newConversation = {
      userQuestion: newQuestion,
      aiResponse: null,
    };
    setConversations([...conversations, newConversation]);
    setTextAreaValue("");

    // Generate AI response
    const aiResponse = await generateAiResponse();

    // Update the conversation with the AI response
    const updatedConversation = {
      userQuestion: newQuestion,
      aiResponse: aiResponse,
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv === newConversation ? updatedConversation : conv
      )
    );
  };

  return (
    <div className="chat-section">
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>

      <div className="result-section">
        <div className="result-container">
          {conversations.map((conversation, index) => (
            <Userchatairesponse
              key={index}
              userQuestion={conversation.userQuestion}
              aiAnswer={conversation.aiResponse}
              negateGenerating={negateGenerating}
              validateGenerating={validateGenerating}
            />
          ))}
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
              <button onClick={(e) => analyzeUserSpeech(e)}>
                <FaMicrophone color="#fff" fontSize="20px" />
              </button>

              <button
                disabled={textAreaValue === "" || generating ? true : false}
                onClick={(e) => {
                  sendUserQuestion(e);
                }}
              >
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
