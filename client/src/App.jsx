import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import Chat from "./pages/Chat";
import Subscriptions from "./pages/Subscriptions";
import Calendar from "./pages/Calendar";
import Members from "./pages/Members";
import BottomNav from "./components/BottomNav";
import SideBar from "./components/SideBar"; // 사이드바 임포트

function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Sidebar */}
      <SideBar />

      {/* Page contents */}
      <main className="flex-1 flex items-center justify-center w-full px-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/subscriptions"
          element={
            <DashboardLayout>
              <Subscriptions />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/calendar"
          element={
            <DashboardLayout>
              <Calendar />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/members"
          element={
            <DashboardLayout>
              <Members />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/setting"
          element={
            <DashboardLayout>
              <h2 className="text-2xl font-bold text-center">Setting</h2>
            </DashboardLayout>
          }
        />
        <Route path="*" element={<IntroPage />} />
      </Routes>
    </Router>
  );
}