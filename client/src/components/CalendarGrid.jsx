import React from "react";

export default function CalendarGrid({
    year,
    month,
    events = [],
    title,
}) {
    // ---- helpers ----
    const monthIndex = month - 1; // JS Date は 0-11
    const firstDate = new Date(year, monthIndex, 1);
    const lastDate = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDate.getDate();

    // 月曜起点に変換（JSの getDay は 0=Sun〜6=Sat）
    const jsWeekday = firstDate.getDay(); // 0..6
    const monFirstOffset = (jsWeekday + 6) % 7; // 0..6（月:0, 火:1, ... 日:6）

    // 42マス分の配列を作る（先頭の空白 + 当月日 + 末尾の空白）
    const cells = Array.from({ length: 42 }, (_, i) => {
        const dayNum = i - monFirstOffset + 1; // 1..daysInMonth
        const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
        const date = inMonth ? new Date(year, monthIndex, dayNum) : null;
        return { inMonth, dayNum: inMonth ? dayNum : null, date };
    });

    // その日のイベント（1つ想定・複数でもOK）
    const eventMap = new Map(
        events.map((e) => [e.date, { icon: e.icon, label: e.label }])
    );

    const monthLabel = new Date(year, monthIndex, 1).toLocaleDateString(
        undefined,
        { year: "numeric", month: "long" }
    );

    const weekLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    return (
        <div className="w-full flex flex-col items-center">
            {/* 見出し */}
            <h2 className="w-full max-w-2xl text-left text-3xl md:text-4xl font-semibold text-white mb-6">
                {title ?? monthLabel}
            </h2>

            {/* 曜日ピル - gap-4 に統一し、flex-1 で幅合わせ */}
            <div className="w-full max-w-2xl flex gap-4 mb-4">
                {weekLabels.map((w) => (
                    <span
                        key={w}
                        className="flex-1 text-center px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs md:text-sm tracking-wide"
                    >
                        {w}
                    </span>
                ))}
            </div>

            {/* カレンダー 7x6 - gap-4 を維持 */}
            <div className="w-full max-w-2xl grid grid-cols-7 gap-4">
                {cells.map((c, i) => {
                    // key をインデックスから一意な文字列に変更
                    const key = c.date ? c.date.toISOString().split("T")[0] : `empty-${i}`;
                    let iconNode = null;
                    let aria = undefined;

                    if (c.inMonth) {
                        const iso = [
                            year,
                            String(month).padStart(2, "0"),
                            String(c.dayNum).padStart(2, "0"),
                        ].join("-");
                        const ev = eventMap.get(iso);
                        if (ev?.icon) {
                            iconNode = (
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    title={ev.label}
                                    aria-label={ev.label}
                                >
                                    {/* 修正: アイコンサイズを標準サイズ (w-7 h-7) に変更 */}
                                    <div className="w-7 h-7 md:w-9 md:h-9 grid place-items-center">
                                        {ev.icon}
                                    </div>
                                </div>
                            );
                            aria = ev.label;
                        }
                    }

                    return (
                        <div
                            key={key}
                            className={[
                                "relative aspect-square rounded-2xl",
                                // 修正: 当月以外は完全に透明（非表示）にする
                                c.inMonth
                                    ? "bg-black/60 border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] hover:bg-white/10 transition-colors"
                                    : "bg-transparent border-transparent",
                            ].join(" ")}
                        >
                            {/* 日付番号 - 当月のみ表示 */}
                            {c.inMonth && (
                                <div className="absolute top-2 left-2 text-white/70 text-sm md:text-base select-none">
                                    {c.dayNum}
                                </div>
                            )}

                            {/* アイコン表示エリア */}
                            {iconNode}

                            {/* クリック領域 - 当月のみボタンを表示 */}
                            {c.inMonth && (
                                <button
                                    type="button"
                                    className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                                    aria-label={
                                        aria ??
                                        `${year}-${String(month).padStart(2, "0")}-${String(
                                            c.dayNum
                                        ).padStart(2, "0")}`
                                    }
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}