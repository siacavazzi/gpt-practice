import React, { useState } from "react";
import { Box, Input, Button } from '@mui/material';

// ChatBar component that provides an input field and a button to send messages
function ChatBar({ submitMessage }) {
    // State to manage the value of the input field
    const [inputValue, setInputValue] = useState("");

    // Handle Enter key press in the input field
    function handleEnter(e) {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    // Handle submission of the message
    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default behavior of the event
        const message = { "role": "user", "content": inputValue }; // Prepare the message
        submitMessage(message); // Pass the message to the parent component
        setInputValue(""); // Clear the input field
    }

    return (
        <Box 
            display="flex"
            justifyContent="center"
            padding={0.5}
            borderTop="5px solid #ccc"
            component="div"
            sx={{
                height: "75px",
                position: 'fixed',
                bottom: '0',
                width: '100%',
                zIndex: 1000,
            }}
        >
            <Input
                variant="filled"
                placeholder="Type a message..."
                fullWidth
                sx={{
                    fontSize: '25px',
                    padding: "10px",
                }}
                value={inputValue}
                onKeyDown={(event) => handleEnter(event)}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Button padding="5px" onClick={handleSubmit} variant="contained" type="submit">Chat</Button>
        </Box>
    );
}

export default ChatBar;
