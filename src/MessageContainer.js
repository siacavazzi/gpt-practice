import React from 'react';
import Message from './Message.js';
import { Box } from '@mui/material';

function MessageContainer({ messages }) {
    return (
        <Box flexGrow={1} p={2}>
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
        </Box>
    );
}

export default MessageContainer;
