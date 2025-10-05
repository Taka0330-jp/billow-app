import { Link } from "react-router-dom";
import BillowLogo from "../assets/icons/Billow.svg";
import LaptopMock from "../assets/images/MockBillow.png";

export default function IntroPage() {
    return (
        <section
            className="
        relative h-screen w-full overflow-hidden
        bg-white text-black
        flex flex-col items-center
      "
        >
            {/* ====== Top Logo ====== */}
            <div className="w-full max-w-6xl px-6 pt-8">
                <img
                    src={BillowLogo}
                    alt="Billow"
                    className="h-8 w-auto"
                    draggable={false}
                />
            </div>

            {/* ====== Hero Text ====== */}
            <div
                className="
          relative z-10
          flex flex-col items-center text-center gap-4
          mt-[6vh] sm:mt-[8vh] lg:mt-[13vh]
          px-6
        "
            >
                <h1 className="text-center text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight tracking-tight">
                    Track team subscriptions with clarity.
                </h1>

                <p className="mt-5 text-center  leading-tight tracking-tight text-[16px] leading-7 text-neutral-600 max-w-[55ch]">
                    Billow centralizes your tools and billing in one place. Understand
                    monthly spend, monitor who uses what, and make smarter decisions with
                    AI-powered insights.
                </p>

                <Link
                    to="/dashboard"
                    className="
            mt-8 inline-flex items-center justify-center
            rounded-full px-8 py-3
            bg-[#3B66FF] hover:bg-[#2f57e6]
            text-white text-base font-medium
            shadow-sm transition
          "
                >
                    Open Dashboard
                </Link>
            </div>

            {/* ====== Laptop Image ====== */}
            <div
                className="
          absolute inset-x-0 bottom-[-230px]
          flex justify-center
          pointer-events-none select-none
        "
                aria-hidden="true"
            >
                <img
                    src={LaptopMock}
                    alt="Billow dashboard preview"
                    className="w-[1100px] max-w-none"
                    draggable={false}
                />
            </div>

            {/* ====== Bottom Gradient Mask ====== */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
        </section>
    );
}
