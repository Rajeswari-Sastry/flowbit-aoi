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
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-50">
      {/* Top bar */}
      <header
        data-testid="topbar-title"
        className="h-14 border-b border-slate-800 flex items-center justify-between px-4"
      >
        <div className="font-semibold text-lg">
          Flowbit AOI Creation
        </div>
        <div className="text-sm text-slate-300">
          PNVS Rajeswari
        </div>
      </header>

      {/* Main area: sidebar + content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          data-testid="sidebar"
          className="w-80 border-r border-slate-800 p-4 flex flex-col gap-4 bg-slate-900/60"
        >
          <h2 className="font-semibold text-base">
            Areas of Interest
          </h2>

          <p className="text-xs text-slate-400">
            This sidebar is reserved for AOI management, filters and tools.
          </p>

          <button className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-xs font-medium px-3 py-2 text-slate-900">
            + New AOI
          </button>

          <div className="mt-4 border-t border-slate-800 pt-4">
            <h3 className="text-xs font-semibold text-slate-300 mb-2">
              Layer Management
            </h3>

            <p className="text-[11px] text-slate-400 mb-2">
              Control visibility of the WMS satellite layer on the map.
            </p>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400">
                WMS Layer status:
              </span>
              <span
                className={
                  "text-[11px] px-2 py-0.5 rounded-full " +
                  (showWms
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/40"
                    : "bg-slate-800 text-slate-400 border border-slate-700")
                }
              >
                {showWms ? "Visible" : "Hidden"}
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleWms}
              className="w-full rounded-lg bg-slate-100 text-slate-900 text-xs font-medium px-3 py-2 hover:bg-white transition-colors"
            >
              {showWms ? "Hide satellite layer" : "Show satellite layer"}
            </button>
          </div>
        </aside>

        {/* Main content (map goes here) */}
        <main className="flex-1">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
