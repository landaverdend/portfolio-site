import { useState } from 'react';
import './chatBubble.css';
import me from '@assets/images/meBlob.png';

function ChatBubble() {
  const [unreadMessages, setUnreadMessages] = useState(1);

  return (
    <div className="chat-container">
      <div className="chat-container__me">
        {unreadMessages > 0 ? <span className="chat-container__unread">{unreadMessages}</span> : <></>}
        <img src={me} height={60} width={60} />
      </div>
    </div>
  );
}

export default ChatBubble;
