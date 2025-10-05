import React, { useState, useEffect } from "react";

// --- 1. Firebase/Auth/Fetch related constants and functions
// ✅ Model name remains the same for compatibility
const GEMINI_MODEL = "gemini-2.5-flash";
// Define the base API URL path
const BASE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// API call function with exponential backoff
const fetchWithRetry = async (payload, retries = 3) => {
  // 1. Get the VITE_GEMINI_API_KEY value from .env.local 
  // This line might trigger the warning, but it's the intended way to access Vite environment variables.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // 2. Create the full URL including the API key
  const fullUrl = apiKey ? `${BASE_API_URL}?key=${apiKey}` : BASE_API_URL;

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Try to parse JSON regardless of status to capture error details
      const json = await res.json().catch(() => {
        throw new Error("Failed to parse JSON response.");
      });

      // If HTTP status is not OK, throw the error message from the response
      if (!res.ok) {
        const errMsg = json.error?.message || `HTTP ${res.status}`;
        throw new Error(errMsg);
      }

      // Return the successful JSON
      return json;
    } catch (error) {
      // If there's an error and we still have retries, wait with exponential backoff
      if (i < retries - 1) {
        // Exponential backoff delay: 1s, 2s, 4s, ...
        await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
      } else {
        // Exhausted retries, throw the last error
        throw error;
      }
    }
  }
};

// --- 2. System prompt (can be empty or customized later)
const systemPrompt = ``;

// --- 3. Initial chat messages (AI greeting)
const initialMessages = [
  {
    id: 1,
    text: "What would you like to do today?",
    role: "ai", // AI message
  },
];

// --- 4. Main Chat Component
export default function Chat() {
  // State variables for messages, input text, loading status, and error
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // A) Send the user message and get AI response
  const sendMessage = async (userMessage) => {
    const messageToSend = userMessage.trim();
    if (!messageToSend || isLoading) return;

    // Add user message to the chat
    const userMsg = {
      id: Date.now(),
      text: messageToSend,
      role: "user",
    };
    setMessages((prev) => [...prev, userMsg]);

    // Clear input and set loading
    setInput("");
    setIsLoading(true);

    // Prepare the request body for Gemini API
    const payload = {
      contents: [
        {
          parts: [{ text: messageToSend }],
        },
      ],
      // Optional system prompt
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    try {
      // Make the request with retry logic
      const result = await fetchWithRetry(payload);

      // Parse the AI text safely
      const candidate = result?.candidates?.[0];
      const aiResponse =
        candidate?.content?.parts?.[0]?.text ||
        "Could not generate a response. Please try again.";

      // Add AI response to messages
      const aiMsg = {
        id: Date.now() + 1,
        text: aiResponse,
        role: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      // On error, show a helpful message
      const errorMsg = {
        id: Date.now() + 1,
        text:
          "Sorry, an issue occurred during the API call. (" +
          error.message +
          ")",
        role: "ai",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  // B) Handler for submit button or pressing Enter
  const handleSend = (e) => {
    if (e) e.preventDefault();
    sendMessage(input);
  };

  // Handler for Enter key down event
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handler for quick action button click
  const handleQuickAction = (actionText) => {
    sendMessage(actionText);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full text-white">
      {/* Header summary (static placeholder UI) */}
      <div className="w-[600px] mb-8 text-center">
        <h1 className="text-[48px] font-bold mb-2">Hi, Hackers</h1>
        <p className="text-[16px] text-white/70 leading-relaxed">
          You have{" "}
          <span className="text-[#4A6CF7] text-lg">6 active subscriptions</span>{" "}
          this month.
          <br />
          That’s about{" "}
          <span className="text-[#4A6CF7] text-lg">$124</span> in total
          spending.
        </p>
      </div>

      {/* Chat card */}
      <section
        className="flex flex-col justify-between w-[600px] h-[400px] rounded-[20px] shadow-xl border relative p-7"
        style={{
          background: "linear-gradient(161deg, #111 50.91%, #3A68FF 171.4%)",
          borderColor: "#3A68FF",
        }}
      >
        {/* Messages list */}
        <div className="w-full pr-1 overflow-y-auto flex-1 mb-4">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3 mb-4">
              <span
                className={`w-6 h-6 rounded-full inline-block mt-0.5 ${m.role === "ai" ? "bg-white/20" : "bg-blue-400"
                  }`}
              />
              <span className="text-white text-base leading-relaxed whitespace-pre-wrap">
                {m.text}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-white/20 animate-pulse inline-block mt-0.5" />
              <span className="text-white/70 text-base">Generating response...</span>
            </div>
          )}
        </div>

        {/* Quick action buttons */}
        <div className="flex justify-between gap-2 mb-4">
          <button
            className="px-3 py-1 text-sm text-white/90 bg-white/10 rounded-full hover:bg-white/20 transition disabled:opacity-50"
            onClick={() => handleQuickAction("Show team report")}
            disabled={isLoading}
          >
            Show team report
          </button>
          <button
            className="px-3 py-1 text-sm text-white/90 bg-white/10 rounded-full hover:bg-white/20 transition disabled:opacity-50"
            onClick={() => handleQuickAction("Cancel a plan")}
            disabled={isLoading}
          >
            Cancel a plan
          </button>
          <button
            className="px-3 py-1 text-sm text-white/90 bg-white/10 rounded-full hover:bg-white/20 transition disabled:opacity-50"
            onClick={() => handleQuickAction("Add a new subscription")}
            disabled={isLoading}
          >
            Add a new subscription
          </button>
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="w-full flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-full bg-white text-black px-5 py-3 text-base outline-none"
            placeholder={
              isLoading ? "Awaiting response..." : "Ask Billow anything..."
            }
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md transition ${isLoading || !input.trim()
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            aria-label="Send"
            title="Send"
          >
            ↑
          </button>
        </form>
      </section>
    </div>
  );
}
