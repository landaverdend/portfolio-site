import { useEffect, useRef, useState } from 'react';
import './chatBubble.css';
import me from '@assets/images/meBlob.png';
import SendIcon from '@assets/images/icons/sendIcon.svg?react';
import { callBackend } from '@/api/backend';
import { Chat, useChatStore } from '@/state/chatState';

type MCProps = {
  closeFn: Function;
  chatLog: Array<Chat>;
};
function MessageContainer({ chatLog, closeFn }: MCProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState<string>('');
  const { addChat } = useChatStore();

  // Add chat to the global store and clear the field.
  const handleSend = () => {
    if (input !== '') {
      addChat(input, 'client');
      setInput('');
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const scrollToBottom = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // Scroll to the bottom
    }
  };

  return (
    <div className="messenger-container">
      <div className="messenger-container__header">
        <img src={me} height={25} width={25} />
        <span>Nicopenis Landaverdgay</span>
        <span className="messenger-container__close" onClick={() => closeFn()}>
          &#10005;
        </span>
      </div>
      <div className="messenger-container__messages" ref={scrollRef}>
        {chatLog.map((chat) => {
          return (
            <div key={crypto.randomUUID()} className={chat.sender === 'server' ? 'sender--server' : 'sender--client'}>
              <span className={chat.sender === 'server' ? 'chat-text server' : 'chat-text client'}>{chat.content}</span>
            </div>
          );
        })}
      </div>
      <div className="messenger-container__send-container">
        <textarea
          placeholder="Aa"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (event.shiftKey) {
                setInput((prev) => prev + '\n');
              } else {
                event.preventDefault();
                handleSend();
              }
            }
          }}></textarea>
        <span className="send-icon">
          <SendIcon onClick={() => handleSend()} />
        </span>
      </div>
    </div>
  );
}

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const [unreadMessages, setUnreadMessages] = useState(3);
  const { chatlog, addChat } = useChatStore();

  return (
    <>
      {!isOpen && (
        <div className="chat-container">
          {
            <div
              className="chat-container__me"
              onClick={() => {
                setIsOpen((prev) => !prev);
                setUnreadMessages(0);
              }}>
              {unreadMessages > 0 ? <span className="chat-container__unread">{unreadMessages}</span> : <></>}
              <img src={me} height={60} width={60} />
            </div>
          }
        </div>
      )}

      {isOpen && <MessageContainer closeFn={setIsOpen} chatLog={chatlog} />}
    </>
  );
}

export default ChatBubble;
