import { Link } from "react-router-dom";

export default function IntroPage() {
    return (
        <section className="h-screen bg-[url('/bg-stars.jpg')] bg-cover bg-center flex flex-col items-center justify-center text-center text-white px-6">
            {/* Logo */}
            <h1 className="text-5xl font-bold text-blue-400 mb-6">Billow</h1>

            {/* Description */}
            <p className="max-w-xl text-gray-300 leading-relaxed mb-10">
                Manage your team's subscriptions in one place.
                Track spending, organize plans, and make smarter business decisions with AI-powered insights.
            </p>

            {/* CTA Button */}
            <Link
                to="/dashboard"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-3 rounded-full transition duration-200"
            >
                Open Dashboard
            </Link>

            {/* Footer */}
            <p className="text-gray-500 text-sm mt-12">© 2025 Billow Team</p>
        </section>
    );
}
