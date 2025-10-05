import BrandIconRow from "../components/BrandIconRow";
import listImg from "../assets/images/list.png"; // 리스트 더미 이미지
import graphImg from "../assets/images/chart.png"; // 그래프 더미 이미지

export default function Subscriptions() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <section className="w-[640px] flex flex-col items-center gap-8 text-center">
        {/* Title */}
        <h1 className="text-4xl font-semibold">Subscription</h1>

        {/* Summary buttons */}
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition">
            8 Subscriptions
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-500 hover:bg-gray-800 transition">
            $2,300
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-500 hover:bg-gray-800 transition">
            20 members
          </button>
        </div>

        {/* Brand logos */}
        <BrandIconRow />

        {/* Graph image */}
        <img
          src={graphImg}
          alt="Trend Chart"
          className="w-[85%] max-w-[540px] rounded-xl shadow-md opacity-90 hover:opacity-100 transition-all"
        />

        {/* Subscription List image */}
        <img
          src={listImg}
          alt="Subscription List"
          className="w-[85%] max-w-[540px] rounded-xl shadow-md opacity-90 hover:opacity-100 transition-all"
        />
      </section>
    </div>
  );
}