import ChatBox from "../components/ChatBox.jsx";

export default function Chat() {
    return (
        <div className="w-full flex flex-col items-center gap-6">

            <ChatBox />


            <p className="text-center text-sm text-white/60 mt-4">
                Drag & drop items anywhere on the page.
            </p>
        </div>
    );
}
