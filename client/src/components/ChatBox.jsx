import { useState } from "react";

export default function ChatBox({
    initialMessages = [{ id: 1, text: "What would you like to do today?" }],
}) {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { id: Date.now(), text: input.trim() }]);
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <section
            className="flex flex-col justify-between w-full w-[578px] h-[400px] rounded-[20px] shadow-xl border relative
                 px-7 pt-7 pb-7"
            style={{
                background: "linear-gradient(161deg, #111 50.91%, #3A68FF 171.4%)",
                borderColor: "#3A68FF",
            }}
        >
            {/* メッセージ表示 */}
            <div className="w-full pr-1 overflow-y-auto">
                {messages.map((m) => (
                    <div key={m.id} className="flex items-start gap-3 mb-4">
                        <span className="w-6 h-6 rounded-full bg-blue-400 inline-block mt-0.5" />
                        <span className="text-white text-base leading-relaxed">{m.text}</span>
                    </div>
                ))}
            </div>

            {/* 入力エリア */}
            <div className="w-full flex gap-3 items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 rounded-full bg-white text-black px-5 py-3 text-base outline-none"
                    placeholder="Ask Billow anything..."
                />
                <button
                    onClick={handleSend}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-500 text-2xl shadow-md"
                    aria-label="Send"
                    title="Send"
                >
                    ↑
                </button>
            </div>
        </section>
    );
}
