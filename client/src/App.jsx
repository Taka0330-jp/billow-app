import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import Chat from "./pages/Chat";
import Subscriptions from "./pages/Subscriptions";
import Calendar from "./pages/Calendar";
import Members from "./pages/Members";
import BottomNav from "./components/BottomNav";

function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[url('/bg-stars.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center">
      {/* Logo */}
      <Link
        to="/"
        className="absolute top-6 left-10 text-3xl font-bold text-blue-400 hover:text-blue-300 transition"
      >
        Billow
      </Link>

      {/* page contents */}
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
        <Route path="/dashboard" element={<DashboardLayout><Chat /></DashboardLayout>} />
        <Route path="/dashboard/subscriptions" element={<DashboardLayout><Subscriptions /></DashboardLayout>} />
        <Route path="/dashboard/calendar" element={<DashboardLayout><Calendar /></DashboardLayout>} />
        <Route path="/dashboard/members" element={<DashboardLayout><Members /></DashboardLayout>} />
        <Route path="/dashboard/setting" element={<DashboardLayout><h2 className="text-2xl font-bold text-center">Setting</h2></DashboardLayout>} />
        <Route path="*" element={<IntroPage />} />
      </Routes>
    </Router>
  );
}
