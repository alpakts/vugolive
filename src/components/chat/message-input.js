import { sendMessageBetweenUsers } from '@/lib/services/firebase-service';
import { useState } from 'react';
import { FiSend, FiGift, FiFile } from 'react-icons/fi';

const ChatMessageInput = ({messageToUser,userEmail,apiUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const HandlesendMessage = () => {
    if (newMessage.trim() !== "") {
      setNewMessage("");
    }
    sendMessageBetweenUsers(userEmail, messageToUser.identity, newMessage,apiUser,messageToUser,'text', {
      age: apiUser.age,
      city: apiUser.city,
      image: null,
      is_host: apiUser.is_host,
      userid: apiUser.id,
      username: apiUser.fullName,
    });

  };
  return (
    <div className="flex items-center mb-4 space-x-2 p-2 bg-gray-800 rounded-full">
      <input
        type="text"
        placeholder="Buraya yaz."
        className="bg-gray-800 text-white w-full px-4 py-2 rounded-full focus:outline-none"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={HandlesendMessage}>
        <FiSend size={24} />
      </button>
     {messageToUser?.is_host &&  <button>
        <FiGift size={24} />
      </button>}
      <button>
        <FiFile size={24} />
      </button>
    </div>
  );
};

export default ChatMessageInput;
