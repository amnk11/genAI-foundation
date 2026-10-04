# GenAI Foundation

A progressive, hands-on learning project that explores the fundamentals of Generative AI using the **OpenAI SDK** with **Google Gemini** as the backend model. Each file builds on the previous one, introducing a new concept — from basic API setup to a fully interactive streaming chatbot.

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **AI SDK:** [openai](https://www.npmjs.com/package/openai) `v7.x`
- **Model:** Google Gemini `gemini-3.6-flash` (via the [Gemini OpenAI-compatible endpoint](https://ai.google.dev/gemini-api/docs/openai))
- **Other:** [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management

## Prerequisites

- **Node.js** ≥ 18
- A **Google AI / Gemini API key** (used via the OpenAI-compatible endpoint)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd genAI-foundation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```env
   OPENAI_API_KEY=your_gemini_api_key_here
   BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
   ```

## Lessons Overview

The project is structured as a series of numbered files, each demonstrating a specific GenAI concept:

### `01-chAi.js` — Client Setup & Utilities

Foundational module that every other file imports. Provides:

- **`apiKeyChecker()`** — Validates the `OPENAI_API_KEY` env variable is set.
- **`checkOpenAI()`** — Creates and returns a configured OpenAI client pointing at the Gemini base URL.

> This file is **not** run directly; it's imported by the other scripts.

---

### `02-chAI.js` — System Prompts & Roles

Demonstrates how **system prompts** shape the AI's personality and behavior. Defines three different personas:

| Role | Description |
|------|-------------|
| `role_anime` | An enthusiastic anime fan |
| `role_oogway` | A wise kung fu master (Master Oogway style) |
| `role_aman` | A casual Hinglish-speaking tech friend |

Sends a user query with the selected system prompt and prints the response along with **token usage statistics**.

```bash
node 02-chAI.js
```

---

### `03-chAI.js` — Tone Comparison

Shows how the **same user question** ("Where is my food order?") produces drastically different responses depending on the system prompt:

- 🟢 **Friendly** — Polite and eager customer service agent
- 🔵 **Formal** — Professional and courteous support rep
- 🔴 **Rude** — Curt and dismissive agent

Great for understanding the power of prompt engineering.

```bash
node 03-chAI.js
```

---

### `04.chAI.js` — Statelessness of LLMs

Demonstrates that **LLMs are stateless by default** — they don't remember previous messages unless you explicitly pass conversation history.

1. First message: "Hey my name is Aman, tell me a 1 line joke"
2. Second message: "Tell my name" → The model **cannot** recall the name because there is no shared context.

```bash
node 04.chAI.js
```

---

### `05-chAI.js` — Conversation History (Memory)

Solves the statelessness problem from `04` by maintaining a **conversation history array**. Previous messages are passed along with each new request, giving the model "memory."

1. First message: "Hey my name is Aman, tell me a 1 line joke"
2. Second message: "Tell my name" → The model **can** now recall the name from history.

```bash
node 05-chAI.js
```

---

### `06-chAI.js` — Async Iterators (Streaming Concept)

A standalone demonstration of JavaScript **async iterators** — the underlying mechanism behind streaming responses. Outputs chunks one by one:

```
chunk 1
chunk 2
...
chunk 5
```

No API calls here; purely a conceptual building block for understanding `07` and `08`.

```bash
node 06-chAI.js
```

---

### `07-chAI.js` — Streaming Responses

Applies the async iterator pattern to **stream AI responses token-by-token** in real time using `stream: true`. Text appears progressively in the terminal instead of waiting for the full response.

Uses the casual Hinglish friend persona (`role_aman`).

```bash
node 07-chAI.js
```

---

### `08-chAI-bot.js` — Interactive Streaming Chatbot

The capstone — a **fully interactive CLI chatbot** that combines all previous concepts:

- ✅ Streaming responses (real-time token output)
- ✅ Conversation history (multi-turn memory)
- ✅ Custom system prompt (a vulgar, unfiltered roast-bot persona)
- ✅ Interactive REPL loop via `readline`

Type your messages and get real-time streamed replies. Type `exit` to quit.

```bash
node 08-chAI-bot.js
```

## Learning Progression

```
01 (Setup) → 02 (System Prompts) → 03 (Tone Engineering)
                                          ↓
         04 (Statelessness) → 05 (Conversation History/Memory)
                                          ↓
              06 (Async Iterators) → 07 (Streaming)
                                          ↓
                              08 (Full Interactive Chatbot)
```

## Key Concepts Covered

| # | Concept | File |
|---|---------|------|
| 1 | OpenAI SDK client setup with custom base URL | `01-chAi.js` |
| 2 | System prompts / role-based personas | `02-chAI.js` |
| 3 | Prompt engineering & tone control | `03-chAI.js` |
| 4 | LLM statelessness | `04.chAI.js` |
| 5 | Conversation history / multi-turn memory | `05-chAI.js` |
| 6 | JavaScript async iterators | `06-chAI.js` |
| 7 | Streaming completions | `07-chAI.js` |
| 8 | Interactive chatbot (REPL + streaming + memory) | `08-chAI-bot.js` |

## Project Structure

```
genAI-foundation/
├── .env                  # API key & base URL config
├── .gitignore
├── package.json
├── 01-chAi.js            # Client setup utilities
├── 02-chAI.js            # System prompts & roles
├── 03-chAI.js            # Tone comparison
├── 04.chAI.js            # LLM statelessness demo
├── 05-chAI.js            # Conversation history
├── 06-chAI.js            # Async iterators explainer
├── 07-chAI.js            # Streaming responses
└── 08-chAI-bot.js        # Interactive chatbot
```

## License

ISC
