import { NavLink } from "react-router-dom";

export default function BottomNav() {
    const itemClass = ({ isActive }) =>
        `flex flex-col items-center gap-0.5 ${isActive ? "text-blue-400" : "text-gray-300"
        }`;

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl rounded-full flex justify-between px-8 py-3 w-[520px] max-w-[92vw] text-sm">
            <NavLink to="/dashboard" end className={itemClass}>
                <span className="text-lg">💬</span>
                Chat
            </NavLink>
            <NavLink to="/dashboard/subscriptions" className={itemClass}>
                <span className="text-lg">📊</span>
                Subscriptions
            </NavLink>
            <NavLink to="/dashboard/calendar" className={itemClass}>
                <span className="text-lg">🗓️</span>
                Calendar
            </NavLink>
            <NavLink to="/dashboard/members" className={itemClass}>
                <span className="text-lg">👥</span>
                Members
            </NavLink>
            <NavLink to="/dashboard/setting" className={itemClass}>
                <span className="text-lg">⚙️</span>
                Setting
            </NavLink>
        </nav>
    );
}
