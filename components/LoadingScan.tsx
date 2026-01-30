import React from 'react';

const LoadingScan: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-64 h-64 border-2 border-slate-700 rounded-2xl overflow-hidden flex items-center justify-center bg-black/50">
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
          <div className="border-r border-b border-slate-500/50"></div>
          <div className="border-r border-b border-slate-500/50"></div>
          <div className="border-b border-slate-500/50"></div>
          <div className="border-r border-b border-slate-500/50"></div>
          <div className="border-r border-b border-slate-500/50"></div>
          <div className="border-b border-slate-500/50"></div>
          <div className="border-r border-slate-500/50"></div>
          <div className="border-r border-slate-500/50"></div>
          <div></div>
        </div>

        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
        
        {/* Central HUD elements */}
        <div className="absolute text-emerald-500/80 font-mono text-xs top-2 left-2">ISO: AUTO</div>
        <div className="absolute text-emerald-500/80 font-mono text-xs bottom-2 right-2">AF-C [ . ]</div>
        
        <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      </div>
      <p className="mt-6 text-emerald-400 font-mono text-sm tracking-widest animate-pulse">ANALYZING SCENE...</p>
      <p className="text-slate-500 text-xs mt-2">正在計算最佳曝光值</p>
    </div>
  );
};

export default LoadingScan;
