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

  // 2. Construct the full URL. If apiKey is present, include it as a query parameter.
  const fullUrl = apiKey ? `${BASE_API_URL}?key=${apiKey}` : BASE_API_URL;
  
  if (!apiKey) {
      // If the key is not explicitly set, rely on the Canvas environment to inject the token.
      console.warn("VITE_GEMINI_API_KEY environment variable is not set. Relying on Canvas default authentication.");
  }


  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      let result;
      try {
        // Attempt to parse the response body
        result = await response.json();
      } catch (e) {
        // Handle cases where response is not valid JSON (e.g., empty body on success/network error)
        throw new Error("Failed to parse JSON response or network error.");
      }

      if (!response.ok) {
        // Handle non-2xx HTTP status codes
        console.error("API Error Response:", result);
        const errorDetail = result.error?.message || `HTTP error! status: ${response.status}`;
        throw new Error(`API call failed: ${errorDetail}`);
      }
      return result;

    } catch (error) {
      if (i < retries - 1) {
        console.warn(`API call retry (${i + 1}/${retries}):`, error.message);
        // Exponential backoff: wait 2^i seconds
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Final failure
      }
    }
  }
};


// -----------------------------------------------------
// 2. Initial messages
// -----------------------------------------------------
const initialMessages = [
  { id: 1, text: "What would you like to do today?", role: "ai" },
];

export default function ChatBox() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // -----------------------------------------------------
  // 3. Core logic: Gemini API call function
  // -----------------------------------------------------
  const sendMessage = async (userMessage) => {
    const messageToSend = userMessage.trim();
    if (!messageToSend || isLoading) return;

    // 1. Add user message and clear input field
    const newUserMessage = { id: Date.now(), text: messageToSend, role: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    // API Payload configuration
    const payload = {
      contents: [{ parts: [{ text: messageToSend }] }],
      systemInstruction: {
        parts: [{ text: "" }]
      },
      // Removed 'tools' property to maintain the simplest authentication flow.
    };

    try {
      // 2. API call (using fetchWithRetry)
      const result = await fetchWithRetry(payload);

      const candidate = result.candidates?.[0];
      let geminiResponse = "Could not generate a response. Please try again.";
      
      if (candidate && candidate.content?.parts?.[0]?.text) {
        geminiResponse = candidate.content.parts[0].text;
      }
      
      // 3. Add Gemini response
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, text: geminiResponse, role: "ai" },
      ]);
      
    } catch (error) {
      console.error("Gemini API final call failed:", error);
      // Notify user about the API error
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          text: `Sorry, an issue occurred during the API call. (Error: ${error.message}). Please check your .env.local file key or try again later.`,
          role: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for sending the message
  const handleSend = (event) => {
    if (event) event.preventDefault();
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

      {/* Top center: Greeting and Subscription Summary (placed above the chat box) */}
      <div className="w-[600px] mb-8 text-center">
        <h1 className="text-[48px] font-bold mb-2 text-white">Hi, Hackers</h1>
        <p className="text-[16px] text-white/70 leading-relaxed">
          You have{" "}
          <a href="#" className="underline text-[#4A6CF7]">
            6 active subscriptions
          </a>{" "}
          this month.
          <br />
          That’s about{" "}
          <a href="#" className="underline text-[#4A6CF7]">
            $124
          </a>{" "}
          in total spending.
        </p>
      </div>

      {/* Main body: Fixed to 600px width (Chat Card) */}
      <section
        className="flex flex-col justify-between w-[600px] h-[400px] rounded-[20px] shadow-xl border relative p-7"
        style={{
          background: "linear-gradient(161deg, #111 50.91%, #3A68FF 171.4%)",
          borderColor: "#3A68FF",
        }}
      >
        {/* 3. Message display area */}
        <div className="w-full pr-1 overflow-y-auto flex-1 mb-4">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3 mb-4">
              {/* Change icon color based on role */}
              <span
                className={`w-6 h-6 rounded-full inline-block mt-0.5 ${
                  m.role === "ai" ? "bg-white/20" : "bg-blue-400"
                }`}
              />
              <span className="text-white text-base leading-relaxed whitespace-pre-wrap">
                {m.text}
              </span>
            </div>
          ))}
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-white/20 animate-pulse inline-block mt-0.5" />
              <span className="text-white/70 text-base">Generating response...</span>
            </div>
          )}
        </div>

        {/* 4. Quick action buttons */}
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

        {/* 5. Input and send area */}
        <form onSubmit={handleSend} className="w-full flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-full bg-white text-black px-5 py-3 text-base outline-none"
            placeholder={isLoading ? "Awaiting response..." : "Ask Billow anything..."}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md transition ${
              isLoading || !input.trim()
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
