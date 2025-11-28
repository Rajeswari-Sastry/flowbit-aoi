import React from "react";

type AppLayoutProps = {
  children: React.ReactNode;
  showWms: boolean;
  onToggleWms: () => void;
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showWms,
  onToggleWms,
}) => {
  return (
    <div className="h-full w-full bg-[#f3f0e8] text-[#2b261f] flex">
      {/* Left slim icon rail */}
      <aside className="hidden md:flex flex-col items-center gap-4 w-12 bg-[#3b3a37] text-[#f6f2ea] py-4">
        <div className="w-8 h-8 rounded-lg bg-[#f6f2ea]/10 flex items-center justify-center text-[11px] font-semibold">
          AOI
        </div>
        <div className="w-8 h-8 rounded-lg bg-transparent border border-[#f6f2ea]/25 flex items-center justify-center text-xs">
          ☐
        </div>
        <div className="w-8 h-8 rounded-lg bg-transparent border border-[#f6f2ea]/25 flex items-center justify-center text-xs">
          ⭕
        </div>
        <div className="w-8 h-8 rounded-lg bg-transparent border border-[#f6f2ea]/25 flex items-center justify-center text-xs">
          📁
        </div>
        <div className="mt-auto w-8 h-8 rounded-lg bg-transparent border border-[#f6f2ea]/25 flex items-center justify-center text-xs">
          ⚙️
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex h-full">
        {/* AOI sidebar */}
        <section
          className="w-[340px] lg:w-[380px] border-r border-[#e0d2bc] flex items-stretch"
          data-testid="sidebar-panel"
        >
          <div className="w-full px-6 pt-6 pb-8 flex flex-col gap-6 bg-[#f7f4ee]">
            {/* Header row: back + title + description */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                className="mt-0.5 w-8 h-8 flex items-center justify-center rounded-full border border-[#ddcdb2] bg-white text-sm shadow-sm"
                aria-label="Back"
              >
                ←
              </button>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-semibold tracking-tight leading-snug">
                  Define Area of Interest
                </span>
                <span className="text-[11px] leading-snug text-[#7a6f60]">
                  Define the area(s) where you will apply your object count &amp;
                  detection model.
                </span>
              </div>
            </div>

            {/* Options section */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-medium text-[#7a6f60] uppercase tracking-[0.14em]">
                Options
              </span>

              {/* Search box */}
              <div className="flex items-center gap-2 rounded-xl border border-[#ddcdb2] bg-white px-3 py-2.5 text-sm shadow-sm">
                <span className="text-neutral-400 text-sm">🔍</span>
                <input
                  className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-neutral-400"
                  placeholder="Search for a city, town... or draw area on map"
                />
              </div>
            </div>

            {/* AOI mode buttons (static, for Figma feel) */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium text-[#7a6f60] uppercase tracking-[0.14em]">
                Draw area on map
              </span>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-between rounded-xl border border-[#ddcdb2] bg-white px-3 py-2 text-[13px] hover:bg-[#f1e5d1]/60 transition-colors"
                >
                  <span>Draw a single area</span>
                  <span className="text-xs text-[#a08d72]">Basic</span>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-between rounded-xl border border-[#ddcdb2] bg-white px-3 py-2 text-[13px] hover:bg-[#f1e5d1]/60 transition-colors"
                >
                  <span>Draw multiple areas</span>
                  <span className="text-xs text-[#a08d72]">Advanced</span>
                </button>
              </div>
            </div>

            {/* Upload button */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium text-[#7a6f60] uppercase tracking-[0.14em]">
                Or upload
              </span>
              <button
                type="button"
                className="w-full rounded-xl border border-[#ddcdb2] bg-[#f1e5d1] text-[13px] font-medium py-2.5 text-[#3a3125] hover:bg-[#e9dac4] transition-colors"
              >
                Uploading a shape file
              </button>
            </div>

            {/* Layer management (your bonus) */}
            <div className="mt-2 pt-4 border-t border-[#e2d7c4] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#7a6f60]">
                  Satellite imagery layer
                </span>
                <span
                  data-testid="wms-status"
                  className={
                    "text-[11px] px-2 py-0.5 rounded-full border " +
                    (showWms
                      ? "bg-emerald-50 border-emerald-400 text-emerald-600"
                      : "bg-neutral-200 border-neutral-400 text-neutral-600")
                  }
                >
                  {showWms ? "Visible" : "Hidden"}
                </span>
              </div>
              <button
                type="button"
                onClick={onToggleWms}
                data-testid="wms-toggle"
                className="w-full rounded-full bg-white border border-[#ddcdb2] text-[12px] py-1.5 text-[#3a3125] hover:bg-[#f1e5d1] transition-colors"
              >
                {showWms ? "Hide satellite layer" : "Show satellite layer"}
              </button>
            </div>
          </div>
        </section>

        {/* Map area – SIMPLE, so it always shows */}
        <section className="flex-1 h-full bg-[#d3d1c9]">
          <div className="w-full h-full">{children}</div>
        </section>
      </main>
    </div>
  );
};
