import { useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";
import ChatSection from "./chatsection";
import "../styles/mainpage.css";
import PrivateRoute from "./privateroute";
import { AppProvider } from "./authcontext";

function MainPage() {
  const [modal, setModal] = useState(false);
  const [inputState, setInputState] = useState(true);
  const [sideBar, setSideBar] = useState(false);

  const toggleInput = () => {
    setInputState(false);
  };

  function toggleModal() {
    setModal(!modal);
  }

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };
  return (
    <PrivateRoute>
      <AppProvider>
        <div className="grid">
          <Header toggleInput={toggleInput} toggleSideBar={toggleSideBar} />
          <SideBar
            toggleProfile={toggleModal}
            sideBar={sideBar}
            toggleSideBar={toggleSideBar}
          />
          <ChatSection
            modal={modal}
            toggleProfile={toggleModal}
            inputState={inputState}
          />
        </div>
      </AppProvider>
    </PrivateRoute>
  );
}
export default MainPage;
