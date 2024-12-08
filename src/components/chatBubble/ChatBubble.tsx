import { useEffect, useMemo, useRef, useState } from 'react';
import './chatBubble.css';
import me from '@assets/images/meBlob.png';
import SendIcon from '@assets/images/icons/sendIcon.svg?react';
import VolumeOff from '@assets/images/icons/volumeOff.svg?react';
import VolumeOn from '@assets/images/icons/volumeUp.svg?react';
import { Chat, useChatStore } from '@/state/chatState';
import { callChatEndpoint } from '@/api/backend';
import ChatLoadingWidget from './chatLoadingWidget/ChatLoadingWidget';
import useInactivityHook from './hooks/inactivityHook';
import sound from '@assets/sounds/notification.mp3';

type MCProps = {
  isVolumeEnabled: boolean;
  setIsVolumeEnabled: Function;
  closeFn: Function;
  chatLog: Array<Chat>;
};
function MessageContainer({ chatLog, closeFn, isVolumeEnabled, setIsVolumeEnabled }: MCProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState<string>('');
  const { clientChatLog, isLoading, addChat, setIsLoading } = useChatStore();

  // Add chat to the global store. Clear the input field.
  const handleSend = () => {
    if (input !== '') {
      addChat(input, 'client');

      setIsLoading(true);
      callChatEndpoint([...clientChatLog, { sender: 'client', content: input }])
        .then((serverResponse) => {
          if (serverResponse !== null) {
            addChat(serverResponse, 'server');
          }
          // TODO: implement some error handling later for empty responses...
        })
        .finally(() => setIsLoading(false));

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
      {/* ------------------ HEADER AREA ------------------*/}
      <div className="messenger-container__header">
        <img src={me} height={30} width={30} />
        <span>Nicodemus Landaverde</span>
        <span onClick={() => setIsVolumeEnabled(!isVolumeEnabled)}>
          {isVolumeEnabled ? <VolumeOn className="hoverable" /> : <VolumeOff className="hoverable" />}
        </span>
        <span className="messenger-container__close hoverable" onClick={() => closeFn()}>
          &#10005;
        </span>
      </div>
      {/* ------------------ MESSAGE LOG ------------------*/}

      <div className="messenger-container__messages" ref={scrollRef}>
        {chatLog.map((chat) => {
          return (
            <div key={crypto.randomUUID()} className={chat.sender === 'server' ? 'sender--server' : 'sender--client'}>
              {chat.sender === 'server' ? <img style={{ borderRadius: 50 }} src={me} height={30} width={30}></img> : <></>}
              <span className={chat.sender === 'server' ? 'chat-text server' : 'chat-text client'}>{chat.content}</span>
            </div>
          );
        })}

        {isLoading && <ChatLoadingWidget />}
      </div>

      {/* ------------------ SEND AREA ------------------*/}
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
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);

  const [unreadMessages, setUnreadMessages] = useState(0);
  const { addChat, clientChatLog: chatlog } = useChatStore();

  const notificationSound = useMemo(() => new Audio(sound), []);
  const parentRef = useRef<HTMLDivElement | null>(null);

  useInactivityHook(addChat, parentRef);

  useEffect(() => {
    notificationSound.volume = isVolumeEnabled ? 1 : 0;
  }, [isVolumeEnabled]);

  useEffect(() => {
    if (!isOpen && chatlog.length > 0) {
      setUnreadMessages((prev) => prev + 1);
      notificationSound.play();
    }
  }, [chatlog]);

  return (
    <div ref={parentRef}>
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

      {isOpen && (
        <MessageContainer
          closeFn={setIsOpen}
          chatLog={chatlog}
          isVolumeEnabled={isVolumeEnabled}
          setIsVolumeEnabled={setIsVolumeEnabled}
        />
      )}
    </div>
  );
}

export default ChatBubble;
