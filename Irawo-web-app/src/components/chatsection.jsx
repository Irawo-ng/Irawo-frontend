/* eslint-disable react/prop-types */
import "../styles/chatsection.css";
import "../styles/modal.css";
import avatar from "../assets/newAvatar.svg";
import visualCue from "../assets/elaborate.svg";
import { FaMicrophone } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { useState, useContext, useEffect, useRef } from "react";
import Userchatairesponse from "./Userchatairesponse";
import { Modal } from "./modal";
import { FeedbackModal } from "./userFeedbackModal";
import { createConversation } from "../conversation";
import { AppContext } from "./authcontext";
// import { refreshToken } from "../auth";

// function ConversationHistory({
//   userConversationHistory,
//   aiConversationHistory,
// }) {
//   const [history, setHistory] = useState(false);
//   const [zippedConversations, setZippedConversations] = useState([]);

//   useEffect(() => {
//     if (
//       userConversationHistory.length !== 0 &&
//       aiConversationHistory.length !== 0
//     ) {
//       const conversations = userConversationHistory.map((userMessage, index) => ({
//         userMessage: userMessage.message,
//         aiMessage: aiConversationHistory[index]?.message || "", // Ensure AI message exists or use an empty string
//       }));
//       setZippedConversations(conversations);
//       setHistory(true);
//     } else {
//       setHistory(false);
//     }
//   }, [userConversationHistory, aiConversationHistory]);
//   return (
//     <>
//       {history ? (
//         zippedConversations.map((conversation, index) => (
//           <div key={index} className="results">
//             <div className="user-question">
//               <div>
//                 <div className="identifier">Me</div>
//               </div>
//               <div className="user display-div">{conversation.userMessage}</div>
//             </div>

//             <div className="ai-response">
//               <div>
//                 <div className="identifier">Star</div>
//               </div>
//               <div className="display-div">{conversation.aiMessage}</div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="conversation-null">
//           <h2>No conversations yet; Start a conversation now.</h2>
//         </div>
//       )}
//     </>
//   );
// }

function ChatSection({ modal, toggleProfile, inputState }) {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [conversations, setConversations] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState({
    feedbackStatus: false,
    feedbackMessage: "",
  });
  const [showElaborate, setShowElaborate] = useState(false);
  const textAreaRef = useRef(null);

  // const [userConversationHistory, setUserConversationHistory] = useState([]);
  // const [aiConversationHistory, setAiConversationHistory] = useState([]);
  // const [refreshTimeout, setRefreshTimeout] = useState(null);

  const { messageState } = useContext(AppContext);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !generating && textAreaValue.trim() !== "") {
        sendUserQuestion(e);
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent default behavior (e.g., adding a new line)
      }
    };
  
    const promptElement = document.getElementById("prompt");
    if (promptElement) {
      promptElement.addEventListener("keydown", handleKeyPress);
    }
  
    return () => {
      if (promptElement) {
        promptElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [generating, textAreaValue]);

  // useEffect(() => {
  //   async function getConversationHistory() {
  //     try {
  //       const convoHistory = await getAllConversationsForUser();
  //       console.log(convoHistory);
  //       if (convoHistory.status === 200) {
  //         setUserConversationHistory((prevUserConversationHistory) =>
  //           prevUserConversationHistory.concat(convoHistory.userConversations)
  //         );
  //         setAiConversationHistory((prevAiConversationHistory) =>
  //           prevAiConversationHistory.concat(convoHistory.aiConversations)
  //         );
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }

  //   // Check if conversation history is already fetched
  //   if (userConversationHistory.length === 0 && aiConversationHistory.length === 0) {
  //     console.log('Getting history..')
  //     getConversationHistory();
  //   }
  // }, [userConversationHistory, aiConversationHistory]);

  // useEffect(() => {
  //   async function refreshTokens() {
  //     const token = localStorage.getItem("refreshToken");
  //     if (token) {
  //       try {
  //         const newToken = await refreshToken(token);
  //         console.log("Refreshing token...");
  //         console.log(newToken.data.refreshToken, newToken.data.accessToken);
  //         localStorage.setItem("authenticated", newToken.data.accessToken);
  //         localStorage.setItem("refreshToken", newToken.data.refreshToken);

  //         // Clear the previous timeout (if any)
  //         if (refreshTimeout) {
  //           clearTimeout(refreshTimeout);
  //         }

  //         // Set a new timeout for refreshing the token after 1 day
  //         const newTimeout = setTimeout(refreshTokens, 10000);
  //         setRefreshTimeout(newTimeout);
  //       } catch (error) {
  //         console.error("Error refreshing token:", error);
  //       }
  //     } else {
  //       console.log("Refresh token not found.");
  //     }
  //   }
  //   // Initial call to refreshTokens
  //   refreshTokens();

  //   // Cleanup function to clear the timeout when the component unmounts
  //   return () => {
  //     if (refreshTimeout) {
  //       clearTimeout(refreshTimeout);
  //     }
  //   };
  // }, [refreshTimeout]);
  const showingElaborate = () => {
    setShowElaborate(true);
  };
  const removeElaborate = () => {
    setShowElaborate(false);
  };

  const analyzeUserSpeech = (e) => {
    e.preventDefault();
    const teaxtAreaInput = textAreaRef.current;
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition();

    recognition.onstart = () => {
      setListening(true);
      console.log("Speak in microphone");
    };
    recognition.onspeechend = () => {
      console.log("stopped listening");
      recognition.stop();
      setListening(false);
    };
    recognition.onresult = (result) => {
      let vocalInput = result.results[0][0].transcript;
      console.log(vocalInput);
      setTextAreaValue(vocalInput);
    };
    recognition.start();
    teaxtAreaInput.focus()
  };

  async function endConversaton() {
    const aiResponse = await createConversation(
      "oofoto777",
      messageState.roles,
      messageState.categories,
      messageState.scenario,
      "text"
    );
    console.log(aiResponse.response.feedback);
    setFeedback({
      feedbackStatus: true,
      feedbackMessage: aiResponse.response.feedback,
    });
  }
  const closeFeedbackModal = () => {
    setFeedback({
      feedbackStatus: false,
      feedbackMessage: "",
    });
    window.location.reload();
  };

  const generateAiResponse = async () => {
    console.log(
      messageState.roles,
      messageState.categories,
      messageState.scenario
    );
    const aiResponse = await createConversation(
      textAreaValue,
      messageState.roles,
      messageState.categories,
      messageState.scenario,
      "text"
    );
    console.log(aiResponse.response.response);

    return aiResponse.response.response;
  };

  const negateGenerating = () => {
    setGenerating(false);
  };
  const validateGenerating = () => {
    setGenerating(true);
  };

  const sendUserQuestion = async (e) => {
    e.preventDefault();
    setGenerating(true);

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
        {showElaborate && <img src={visualCue} alt="" className="visualcue" />}
      </div>

      <div className="result-section">
        <div className="result-container">
          {/* <ConversationHistory
            userConversationHistory={userConversationHistory}
            aiConversationHistory={aiConversationHistory}
          /> */}
          {conversations.map((conversation, index) => (
            <Userchatairesponse
              key={index}
              userQuestion={conversation.userQuestion}
              aiAnswer={conversation.aiResponse}
              negateGenerating={negateGenerating}
              validateGenerating={validateGenerating}
              showElaborate={showingElaborate}
              removeElaborate={removeElaborate}
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
              placeholder={
                listening ? "Listening..." : "How can i help you today"
              }
              disabled={inputState}
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              ref={textAreaRef}
            ></textarea>

            <div className="btn-container">
              <button disabled={inputState} onClick={(e) => analyzeUserSpeech(e)}>
                <FaMicrophone color="#fff" fontSize="20px" />
              </button>

              <button
                disabled={textAreaValue === "" || generating ? true : false}
                onClick={(e) => {
                  sendUserQuestion(e);
                }}
              >
                {textAreaValue === "" ? (
                  <div className="dark">
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
        <button
          disabled={inputState}
          style={{
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
            backgroundColor: "transparent",
            border:'none'
          }}
          onClick={endConversaton}
          className=""
        >
          {" "}
          End{" "}
        </button>
      </div>

      {modal ? (
        <div className="modal">
          <div className="overlay"></div>
          <Modal toggleProfile={toggleProfile} />
        </div>
      ) : null}
      {feedback.feedbackStatus && (
        <div className="modal">
          <div className="overlay"></div>
          <FeedbackModal
            message={feedback.feedbackMessage}
            closeModal={closeFeedbackModal}
          />
        </div>
      )}
    </div>
  );
}
export default ChatSection;
