import React, { useState , useEffect } from 'react';
import MessageContainer from './MessageContainer.js';
import ChatBar from "./ChatBar.js";
import GPTresponse from './GPTcontainer.js';
import './App.css';

function ChatPage() {
    const [chatMessages, setChatMessages] = useState([]);


    async function submitMessage(message) {
        // add user message to chat and update state
        const newChat = [...chatMessages, message]
        setChatMessages(newChat)

        // get GPT response from user message and update state when promise resolves
        const response = await GPTresponse(newChat)
        setChatMessages([...newChat, response])       
    }

    return (
        <>
            <MessageContainer messages={chatMessages} />
            <ChatBar aria-label="chat-bar" submitMessage={submitMessage} />
        </>
    );
}

export default ChatPage;
