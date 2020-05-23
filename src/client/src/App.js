import React, {useState} from 'react';
import './App.css';
import PageHeader from "./components/PageHeader";
import UsernameComponent from "./components/UsernameComponent";
import MessageList from "./components/MessageList";
import MessageBox from "./components/MessageBox";
import SockJs from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'
import {Pane} from "evergreen-ui";

const socket = new SockJs("http://localhost:8080/chatroom", {}, {CheckOrigin: () => false});
socket.onopen = () => {
  console.log('Connected to server');
};
socket.onclose = () => {
  console.log('Disconnected from server');
};

const stompClient = Stomp.over(socket);
stompClient.connect({}, () => {
  console.log('Connected to chat server');
});

function App() {
  const [userName, updateUsername] = useState("");
  const [chatMessages, updateChatMessages] = useState([]);
  const [currentMessageId, updateMessageId] = useState(0);
  const addNewChatMessage = (newMessage) => {
    const messagesWithNew = [...chatMessages, newMessage];
    updateChatMessages(messagesWithNew);
  };
  const sendChatMessage = (newMessage) => {
    const messageObj = {userName, messageContent: newMessage, messageId: currentMessageId};
    stompClient.publish({destination: '/api/chat', body: JSON.stringify(messageObj)});
    updateMessageId(currentMessageId + 1);
  };
  if(stompClient.connected) {
    stompClient.subscribe('/chat', (message) => {
      console.log('message received', message);
      addNewChatMessage(JSON.parse(message.body));
    });
  }
  return (
    <Pane width="100%"  display="flex" alignItems="center" justifyContent="center" className="margin-top">
      <div>
        <PageHeader/>
        <UsernameComponent currentUsername={userName} updateUsername={updateUsername}/>
        <MessageList messages={chatMessages}/>
        <MessageBox sendMessage={sendChatMessage}/>
      </div>
    </Pane>

  );
}

export default App;
