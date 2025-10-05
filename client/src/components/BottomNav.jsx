import { NavLink } from "react-router-dom";
import ChatDots from "../assets/icons/ChatDots.svg";
import ChartBar from "../assets/icons/ChartBar.svg";
import CalendarCheck from "../assets/icons/CalendarCheck.svg";
import Users from "../assets/icons/Users.svg";
import Gear from "../assets/icons/Gear.svg";

const ActiveBar = ({ active }) => (
  <div
    className={`self-stretch h-[0.125rem] ${active ? "bg-[#3a68ff]" : "bg-transparent"
      }`}
  />
);

const Item = ({ to, end, icon, label }) => (
  <NavLink to={to} end={end} className="w-auto">
    {({ isActive }) => (
      <div
        className={`${
          // frame-container 스타일
          isActive ? "text-white" : "text-[rgba(255,255,255,0.7)]"
          } flex flex-col items-center gap-[0.375rem] text-center`}
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {/* chatdots-parent */}
        <div className="w-auto flex flex-col items-center gap-[0.25rem]">
          <img
            src={icon}
            alt={label}
            className={`w-8 h-8 max-h-full ${isActive ? "opacity-100" : "opacity-70"
              }`}
          />
          {/* 글자 */}
          <span className="relative w-full text-[0.75rem] leading-[1.4] font-medium">
            {label}
          </span>
        </div>

        {/* 하단 활성 바 (2px) */}
        <ActiveBar active={isActive} />
      </div>
    )}
  </NavLink>
);

export default function BottomNav() {
  return (
    <nav
      className="
        fixed left-1/2 -translate-x-1/2 bottom-10
        w-[520px] max-w-[92vw] h-[4.313rem]   /* 69px */
        rounded-[87.5px] bg-[#1b1b1b]         /* frame-parent */
        flex flex-col items-center justify-end
        text-left
        text-[0.75rem]
        text-[rgba(255,255,255,0.7)]
      "
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      {/* frame-group: 아래쪽에 붙는 내부 래퍼 */}
      <div className="mb-0 px-8 w-full">
        <div className="flex items-start gap-[2.937rem] justify-start">
          {/* 레퍼런스 순서대로 */}
          <Item to="/dashboard" end icon={ChatDots} label="Chat" />
          <Item to="/dashboard/subscriptions" icon={ChartBar} label="Subscriptions" />
          <Item to="/dashboard/calendar" icon={CalendarCheck} label="Calendar" />
          <Item to="/dashboard/members" icon={Users} label="Members" />
          <Item to="/dashboard/setting" icon={Gear} label="Setting" />
        </div>
      </div>
    </nav>
  );
}