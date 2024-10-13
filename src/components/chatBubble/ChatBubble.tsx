import { useEffect, useState } from 'react';
import './chatBubble.css';
import me from '@assets/images/meBlob.png';

type Chat = {
  sender: 'me' | 'you';
  content: string;
};

type MCProps = {
  closeFn: Function;
  chatLog: Array<Chat>;
};
function MessageContainer({ chatLog, closeFn }: MCProps) {
  return (
    <div className="messenger-container">
      <div className="messenger-container__header">
        <img src={me} height={25} width={25} />
        <span>Nicopenis Landaverdgay</span>
        <span className="messenger-container__close" onClick={() => closeFn()}>
          &#10005;
        </span>
      </div>
      <div className="messenger-container__messages">
        {chatLog.map((chat) => {
          return (
            <div className={chat.sender === 'me' ? 'sender--ME' : 'sender--YOU'}>
              <span className={chat.sender === 'me' ? 'chat-text ME' : 'chat-text YOU'}>{chat.content}</span>
            </div>
          );
        })}
      </div>
      <div className="messenger-container__sendField">this here is the chat log.</div>
    </div>
  );
}

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const [unreadMessages, setUnreadMessages] = useState(3);
  const [chatLog, setChatLog] = useState<Array<Chat>>([]);

  useEffect(() => {
    const toPut: Chat[] = [];
    for (let i = 0; i < 25; i++) {
      toPut.push({ sender: 'me', content: 'message number ' + i });
      toPut.push({ sender: 'you', content: 'message number ' + i });
    }
    setChatLog(toPut);
  }, []);

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

      {isOpen && <MessageContainer closeFn={setIsOpen} chatLog={chatLog} />}
    </>
  );
}

export default ChatBubble;
