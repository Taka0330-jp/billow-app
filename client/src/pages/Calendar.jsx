import CalendarGrid from "../components/CalendarGrid.jsx";
// 画像ファイルのインポート
import C4dIcon from "../assets/images/C4d.png";
import AdobeAppsIcon from "../assets/images/Adobe Apps.png";
import FigmaIcon from "../assets/images/Figma.png";
import OctaneIcon from "../assets/images/Octane.png";
import WebFlowIcon from "../assets/images/Webflow.png";

// 画像専用のコンポーネントとしてシンプルに再定義
// NOTE: CalendarGrid側で親のサイズが決められているため、w-full h-full でフィットさせる
const ImageDot = ({ src, alt = "Event icon" }) => (
    <div className="w-3 h-3 md:w-6 md:h-6 flex items-center justify-center">
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
        />
    </div>
);

export default function CalendarPage() {
    return (
        <div className="w-full flex justify-center">
            {/* max-w-5xl に戻し、最初のデザインサイズに統一 */}
            <div className="w-full max-w-5xl">
                <CalendarGrid
                    year={2025}
                    month={10}
                    events={[
                        // ImageDot コンポーネントを使用し、srcを直接渡す
                        {
                            date: "2025-10-07",
                            icon: <ImageDot src={C4dIcon} />,
                            label: "Cinema 4D Rendering"
                        },
                        {
                            date: "2025-10-15",
                            icon: <ImageDot src={AdobeAppsIcon} />,
                            label: "Cinema 4D Rendering"
                        },
                        {
                            date: "2025-10-20",
                            icon: <ImageDot src={FigmaIcon} />,
                            label: "AdobeApps"
                        },
                        {
                            date: "2025-10-03",
                            icon: <ImageDot src={OctaneIcon} />,
                            label: "Octane"
                        },

                        {
                            date: "2025-10-18",
                            icon: <ImageDot src={WebFlowIcon} />,
                            label: "WebFlow"
                        },

                    ]}
                />
                
            </div>
        </div>
    );
}