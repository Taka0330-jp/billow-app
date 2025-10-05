import SideBar from "../components/SideBar"; // 사이드바 임포트
import ChatBox from "../components/ChatBox"; // 채팅 박스 임포트
import BottomNav from "../components/BottomNav"; // 하단 네비게이션 임포트

export default function Chat() {
  return (
    <div>
      {/* 사이드바 */}
      <SideBar />
        <div className="w-[529px] mb-8 ml-[24px]">
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
      {/* 메인 영역: 채팅 박스와 하단 네비 */}
      <ChatBox />
      <BottomNav />

    </div>
  );
}
