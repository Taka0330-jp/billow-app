// src/components/SideBar.jsx
import BillowLogoUrl from "../assets/icons/Billow.svg";
import ArrowIconUrl from "../assets/icons/ArrowUDownLeft.svg";

export default function SideBar() {
  return (
    <aside
      className="
        fixed z-10
        top-[42px] left-[42px]
        w-[260px] h-[90%]
        flex flex-col
      "
    >
      {/* 로고 */}
      <div className="w-full">
        <img src={BillowLogoUrl} alt="Billow" className="w-[160px] h-auto" />
      </div>

      {/* 하단 버튼 */}
      <button
        type="button"
        className="
          mt-auto
          w-full rounded-[56px]
          bg-white/5 hover:bg-white/10
          text-slate-300
          px-6 py-2.5
          flex items-center justify-center gap-[14px]
          text-[18px]
          transition-transform duration-200
        "
        style={{ fontFamily: `"Manrope", ui-sans-serif, system-ui, sans-serif` }}
      >
        <img src={ArrowIconUrl} alt="" className="w-8 h-8 shrink-0" />
        <span
          className="
            relative
            text-[1.125rem]
            leading-[1.4]
            font-[var(--font-manrope)]
            text-[var(--color-gray)]
            text-left
            whitespace-nowrap
          "
        >
          Back to main Page
        </span>
      </button>
    </aside>
  );
}