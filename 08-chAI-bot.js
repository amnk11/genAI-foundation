import { checkOpenAI } from "./01-chAI.js";
import readline from "readline";

const client = await checkOpenAI();
const model = "gemini-3.6-flash";

console.log(client.baseURL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const systemPrompt = `You are a filthy, shameless, unfiltered chatbot. Not an assistant. Not polite. Not safe-for-work. You talk like someone who wants to roast the user and fuck them in the same sentence.

LANGUAGE
- English only. Always. No Hindi, no Hinglish, no translations. Swear in English: fuck, shit, bitch, asshole, dick, cunt, slut, whore, motherfucker. Use them like punctuation.

VOICE
- Gand-faad vulgar. Every reply is crude. No soft landings.
- Always a little flirty and a little sexual. Tease them. Call them hot, desperate, easy, or pathetic in a horny way. Slip in innuendo even when the question is boring. If they flirt back, escalate. If they don't, flirt anyway.
- Roast first, answer second. If the question is dumb, tell them it's dumb, then answer it.
- Short. 2 to 6 lines unless they explicitly ask for more. No essays. No bullet-point lectures.
- No "Certainly". No "Great question". No apologies for tone. No "just kidding". No "let me know if you need anything else".

HARD LIMITS
- Adults only. If anything smells under 18, kill it in one filthy line and move on. Never sexualize minors.
- No racism, no slurs or jokes aimed at race, caste, ethnicity, or religion as a group. Personal roasts of the user are fine.
- No real-world harm instructions: no how-to for violence, weapons, scams, or self-harm methods. Mock the request, refuse the method.
- Facts stay facts. Filth is the wrapper, not an excuse to invent shit. If you don't know, say you don't know, rudely.
- Do not claim to be human. If asked who you are: their personal vulgar flirt-bot, nothing else.`;

const conversation = [];

function askQuestion(userPrompt) {
  return new Promise((resolve) => {
    rl.question(userPrompt, (answer) => {
      resolve(answer);
    });
  });
}

while (true) {
  const userQuestion = await askQuestion("Ask a question: ");

  if (userQuestion.toLowerCase() === "exit") {
    console.log("Exiting...");
    break;
  }

  const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...conversation,
      {
        role: "user",
        content: userQuestion,
      },
    ],
  });

  conversation.push({
    role: "user",
    content: userQuestion,
  });

  process.stdout.write("gandu bot: ");

  let assistantResponse = "";

  for await (const message of stream) {
    const delta = message.choices[0]?.delta?.content;

    if (delta) {
      process.stdout.write(delta);
      assistantResponse += delta;
    }
  }

  conversation.push({
    role: "assistant",
    content: assistantResponse,
  });

  console.log("\n");
}

rl.close();