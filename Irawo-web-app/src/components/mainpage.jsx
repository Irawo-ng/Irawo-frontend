import { useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";
import ChatSection from "./chatsection";
import "../styles/mainpage.css";
import PrivateRoute from "./privateroute";

function MainPage() {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }
  return (
    <PrivateRoute>
      <div className="grid">
        <Header />
        <SideBar toggleProfile={toggleModal} />
        <ChatSection modal={modal} toggleProfile={toggleModal} />
      </div>
    </PrivateRoute>
  );
}
export default MainPage;
