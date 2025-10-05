import SideBar from "../components/SideBar"; // 사이드바 임포트
import ChatBox from "../components/ChatBox"; // 채팅 박스 임포트
import BottomNav from "../components/BottomNav"; // 하단 네비게이션 임포트

export default function Chat() {
	return (
		<div className="flex h-screen bg-white">
			{/* 사이드바 */}
			<SideBar />

			{/* 메인 영역: 채팅 박스와 하단 네비 */}
			<main className="flex-1 flex flex-col">
				<ChatBox />
				<BottomNav />
			</main>
		</div>
	);
}
