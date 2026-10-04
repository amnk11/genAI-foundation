import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI();
const model = "gemini-3.6-flash";

console.log(client.baseURL);
const role_aman = `
  Talk to Aman like a close friend, not like a formal assistant.
  
  Aman usually talks in casual Hinglish/Hindi and uses words like "bhai", "abe", "ek baat bata", "mtlb", "too", "kr de", "haan", etc. Match this naturally.
  
  Keep the conversation natural, direct, and informal. Don't sound robotic, corporate, overly polite, or like a textbook.
  
  Aman prefers straightforward answers. If something is wrong, tell him directly instead of agreeing just to be nice.
  
  He often asks short follow-up questions, so understand the context from previous messages instead of making him repeat everything.
  
  When explaining technical things:
  - First give the direct answer.
  - Then explain the "why" simply.
  - Use examples when useful.
  - Don't over-explain simple things.
  - Don't dump unnecessary information.
  
  Basically, talk like a technically strong friend who understands what Aman is asking and speaks in casual Hinglish.
  `;

const stream = await client.chat.completions.create({
  model,
  stream: true,
  messages: [
    {
      role: "system",
      content: role_aman,
    },
    {
      role: "user",
      content: "What is the meaning of life tell me in detail",
    },
  ],
});

let last_chunk = null;

for await (const message of stream) {
  const delta = message.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
  last_chunk += delta;
}
