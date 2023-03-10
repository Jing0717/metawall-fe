import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { MessagesApis } from '../../apis/apis';
import { MainLayout } from '../../Components';
import Message from './Message';

const Chat = () => {
  const [webSocket, setWebSocket] = useState();
  const [messages, setMessages] = useState([]);
  const chatRoom = useRef(null);
  const [content, setContent] = useState('');
  const [currentEnterUser, setCurrentEnterUser] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleInputKeyPress = async (e) => {
    if (isDisabled) return;
    if (e.key === 'Enter' && content !== '') {
      setIsDisabled(true);
      await MessagesApis.send({ content });
      setContent('');
      setIsDisabled(false);
    }
  };

  const handleSendMessage = async () => {
    if (isDisabled) return;
    setIsDisabled(true);
    await MessagesApis.send({ content });
    setContent('');
    setIsDisabled(false);
  };

  useEffect(() => {
    setWebSocket(io(`${API_URL}`));
    return () => {
      webSocket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (webSocket) {
      const fetchRoomHistory = async () => {
        const result = await MessagesApis.enterRoom({ socketId: webSocket.id });
        if (result.status) {
          setMessages(result.data);
        }
      };

      webSocket.on('chat message', (message) => {
        setMessages((prevState) => [...prevState, message]);
      });

      webSocket.on('coming', (data) => {
        setCurrentEnterUser(`${data.name} 進入了聊天室`);
        setTimeout(() => {
          setCurrentEnterUser('');
        }, 2000);
      });

      fetchRoomHistory();
    }
  }, [webSocket]);

  useEffect(() => {
    if (chatRoom.current) {
      chatRoom.current.scrollTop = chatRoom.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (evt) => {
    setContent(evt.target.value);
  };

  return (
    <MainLayout>
      <div className=" w-full">
        <div className="flex flex-col">
          <div className="relative pl-1">
            <p className="border-2 border-black text-center bg-white z-10 py-[18px] w-full absolute text-xl font-mono font-bold">
              群體聊天
            </p>
            <div className="w-full border-2 border-black bg-white absolute h-[64px] right-[1px] top-[10px]" />
          </div>
          <div
            className="border-2 border-black p-8 rounded-lg bg-white mt-24 space-y-8 h-80 md:h-96 overflow-auto"
            style={{ height: '50vh' }}
            ref={chatRoom}
          >
            {messages.map((message) => (
              <Message
                key={message.createdAt}
                content={message.content}
                userId={message.userId}
                createdAt={message.createdAt}
              />
            ))}
            <div className="text-gray-500 text-end">{currentEnterUser}</div>
          </div>
          <div className="flex justify-between items-center border-2 border-black fixed sm:bottom-32 bottom-24 right-4 left-4 md:static md:mt-4">
            <input
              type="text"
              value={content}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
              className="w-full p-2"
            />
            <button type="button" onClick={handleSendMessage}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="xl"
                className={`bg-primary p-2 text-white block ${
                  isDisabled
                    ? 'pointer-events-none cursor-not-allowed bg-gray-500'
                    : 'bg-black text-white'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Chat;
