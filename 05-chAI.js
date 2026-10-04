import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI();
const model = "gemini-3.6-flash";

console.log(client.baseURL);

const conversation = [];

async function askQuestion(systemPrompt, userPrompt, history = []) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userPrompt },
    ],
  });
  history.push({ role: "user", content: userPrompt });
  history.push({
    role: "assistant",
    content: response.choices[0].message.content,
  });
  return response.choices[0].message.content;
}

const userQuestion = "Hey my name is Aman, tell me a 1 line joke";

const friendly = await askQuestion(
  "You always respond in 1 line and in friendly manner",
  userQuestion,
  conversation
);

console.log("++++++++++ Friendly response: ++++++++++");
console.log(friendly);

const userQuestion2 = "Tell my name"; // at this point the llm will have the conversation history.

const formal = await askQuestion(
  "You always respond in 1 line",
  userQuestion2,
  conversation
);

console.log("++++++++++ Formal response: ++++++++++");
console.log(formal);