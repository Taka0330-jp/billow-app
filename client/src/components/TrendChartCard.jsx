import ChartImg from "../assets/images/chart.png";

export default function TrendChartCard() {
  return (
    <div className=" rounded-2xl">
      <img
        src={ChartImg}
        alt="Subscriptions trend"
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
}