import { useState } from 'react';
import './chatBubble.css';
import me from '@assets/images/meBlob.png';

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);

  return (
    <>
      {!isOpen && (
        <div className="chat-container">
          {
            <div
              className="chat-container__me"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}>
              {unreadMessages > 0 ? <span className="chat-container__unread">{unreadMessages}</span> : <></>}
              <img src={me} height={60} width={60} />
            </div>
          }
        </div>
      )}
      {/* CHAT CONTAINER Code...*/}
      {isOpen && (
        <div className="messenger-container">
          <div className="messenger-container__header">
            <img src={me} height={25} width={25} />
            <span>Nicopenis Landaverdgay</span>
            <span
              className="messenger-container__close"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}>
              &#10005;
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBubble;
