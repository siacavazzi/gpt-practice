import Key from './Key.js'
import OpenAI from 'openai';


async function GPTresponse(messages) {

    // this is the system prompt, it specifies how GPT will act over the course of the conversation -- this is a really fun variable to change
    let your_prompt = "you are a helpful assistant"

    // your_prompt = "you are a racoon, only respond with racoon noises"
    // your_prompt = "you are a software engineering student's bad react project, act like it"

    const sysPrompt = {"role":"system", "content":your_prompt}
   

    // Exclude system messages from input to GPT, to avoid exposing them to the user
    let tempMessages = [...messages];
    tempMessages.unshift(sysPrompt)

    // Configure OpenAI API -- Note: dangerouslyAllowBrowser: true allows the API to run on the front end, this is new as of last week 
    const openai = new OpenAI({ apiKey: Key, dangerouslyAllowBrowser: true });

    // Specify GPT API parameters
    const responseObject = {
        model: 'gpt-3.5-turbo-0613',  // Model with function calling capability. List of all models here: https://platform.openai.com/docs/models/overview
        messages: tempMessages,
        functions: functions,
        function_call: "auto",  // Allow GPT to call functions
        temperature: 0.5  // Balance between creativity and consistency. Essentially this number specifies how chaotic you want GPT's answers to be
        // higher numbers give more creative and varied answers, however this also increases the changes of hallucinations 
    }

    // Call the GPT API
    let response = await openai.chat.completions.create(responseObject);
    let message = response.choices[0].message;
    // and thats all the code for basic use of the GPT API

//--------------------- The code below this line is for facilitating function calls -------------------------------//

    // If the response contains a function call, execute it
    if (message.function_call) {
        const functionName = message.function_call.name;
        const functionArgs = JSON.parse(message.function_call.arguments);

        console.log(functionArgs);

        // Map available functions to their implementations
        const availableFunctions = {
            "GetCurrentTime": GetCurrentTime,
        };

        // If the called function is available, execute it with the provided arguments
        if (availableFunctions[functionName]) {
            const functionResponse = await availableFunctions[functionName](...Object.values(functionArgs));

            // Update the conversation with the function response, so GPT can see the outcome
            tempMessages.push(message);
            tempMessages.push({
                role: "function",
                name: functionName,
                content: functionResponse.toString()  // Ensure string format
            });

            // Resubmit updated conversation to GPT
            const payload = {
                model: 'gpt-3.5-turbo-0613',
                messages: tempMessages
            };
            console.log(payload);
            response = await openai.chat.completions.create(payload);
            message = response.choices[0].message;

            console.log(functionResponse);
        }
    }
    console.log("output:");
    console.log(message);
    return message;

    
}

export default GPTresponse;

//---------------------------------------- Functions and definitions for GPT ----------------------------------------//
// docs: https://platform.openai.com/docs/guides/gpt/function-calling

 // This function returns the current time in HH:mm format. All you have to do is ask GPT for the time and it will call this function.
 const GetCurrentTime = () => {
    console.log("Getting the time");
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');  // Ensure two-digit hour
    const minutes = String(date.getMinutes()).padStart(2, '0');  // Ensure two-digit minute
    return (hours + ":" + minutes);
}

// Define available functions for GPT and their usage
const functions = [{
    "name": "GetCurrentTime",
    "description": "Get the current time in hours and minutes",
    "parameters": {
        "type": "object",
        "properties": {}
    },
    "return": {
        "type": "string",
        "description": "The current time in the format HH:mm"
    }
}];

// try to implement some of your own functions. 
// Some ideas:
// - addNumbers(number1, number2): a function which allows gpt to add 2 numbers (if you're really feeling creative you can expand this to do all the math operations)
// - getWeather(): a function which uses some API to get weather information
// - getDate(): returns the current date

// you can get really creative here