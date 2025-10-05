
import { NavLink } from "react-router-dom";
import ChatDots from "../assets/icons/ChatDots.svg";
import ChartBar from "../assets/icons/ChartBar.svg";
import CalendarCheck from "../assets/icons/CalendarCheck.svg";
import Users from "../assets/icons/Users.svg";
import Gear from "../assets/icons/Gear.svg";

export default function BottomNav() {
    const itemClass = ({ isActive }) =>
        `flex flex-col items-center gap-0.5 ${isActive ? "text-blue-400" : "text-gray-300"
        }`;

    return (
        <nav className="fixed bottom-[100px] left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl rounded-full flex justify-between px-8 py-3 w-[520px] max-w-[92vw] text-sm">
            <NavLink to="/dashboard" end className={itemClass}>
                <img src={ChatDots} alt="Chat" className="w-5 h-5" />
                <span>Chat</span>
            </NavLink>
            <NavLink to="/dashboard/subscriptions" className={itemClass}>
                <img src={ChartBar} alt="Subscriptions" className="w-5 h-5" />
                <span>Subscriptions</span>
            </NavLink>
            <NavLink to="/dashboard/calendar" className={itemClass}>
                <img src={CalendarCheck} alt="Calendar" className="w-5 h-5" />
                <span>Calendar</span>
            </NavLink>
            <NavLink to="/dashboard/members" className={itemClass}>
                <img src={Users} alt="Members" className="w-5 h-5" />
                <span>Members</span>
            </NavLink>
            <NavLink to="/dashboard/setting" className={itemClass}>
                <img src={Gear} alt="Setting" className="w-5 h-5" />
                <span>Setting</span>
            </NavLink>
        </nav>
    );
}
