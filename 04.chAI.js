import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI();
const model = "gemini-3.6-flash";

console.log(client.baseURL);

async function askQuestion(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return response.choices[0].message.content;
}

const userQuestion = "Hey my name is Aman, tell me a 1 line joke";

const friendly = await askQuestion(
  "You always respond in 1 line and in friendly manner",
  userQuestion,
);

console.log("++++++++++ Friendly response: ++++++++++");
console.log(friendly);

const userQuestion2 = "Tell my name"; // it does not know my name becouse a llm doesnt have a memory 

const formal = await askQuestion(
  "You always respond in 1 line",
  userQuestion2,
);

console.log("++++++++++ Formal response: ++++++++++");
console.log(formal);
