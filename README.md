# This is my attempt at some kind of GPT API Lab

I know the react phase is over but I ended up writing most of this code when I was teaching myself the GPT API and figured it would be useful for others since some people were interested. I learned this all from the OpenAI API documentation located here: https://platform.openai.com/docs/introduction/overview
Unfortunately, they did just update the API like last week so some of the code comments might not be 100% right. 

So the GPT API has some special abilities over standard chatGPT. The main one is that it has the ability to call functions and interpret the results. This is a crazy functionality because it can allow you to give GPT new abilities. I have one simple function implemented here and all it does is allow GPT to see what time it is. Just ask it the time and it will call the function. Implementing your own functions is not difficult.

## Getting started
1. Fork and clone as usual

2. Navigate to this directory

3. run `npm install`

4. run `npm start`

### All of the GPT API code is located in the GPTcontainer.js file

## Deliverables
1. Get an API key here: https://platform.openai.com/account/api-keys and place it in the Key.js file. I know this is a paid key but as long as you don't spam the API it will be extremely cheap (like a few cents every hundered or so calls if they are fairly short). Just make sure whatever you do to this code it doesnt cause an API call loop.
... and thats pretty much it. The code is really fun to tinker around with. Try changing the system prompt to make GPT act differently. 

2. There is currently only one function availible for GPT to call. As a stretch deliverable you could try and implement your own functions for GPT to call, there are some ideas in the GPTcontainer but really the sky is the limit.
Here is the documentation: https://platform.openai.com/docs/guides/gpt/function-calling





