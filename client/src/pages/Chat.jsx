// client/src/pages/Chat.jsx
import React from "react";
import ChatBox from "../components/ChatBox.jsx";

export default function Chat() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* 사이드바 자리 (필요시 여기에 컴포넌트 배치) */}

      {/* 본문 콘텐츠: 채팅 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <ChatBox />
        <p className="text-center text-sm text-white/60 mt-4">
          Drag & drop items anywhere on the page.
        </p>
      </div>
    </div>
  );
}