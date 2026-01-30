import React from 'react';
import { CameraSettings } from '../types';

interface SettingsCardProps {
  settings: CameraSettings;
  onReset: () => void;
}

const SettingsItem: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg">
    <div className="text-emerald-400 mb-2">{icon}</div>
    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">{label}</span>
    <span className="text-white text-lg md:text-xl font-bold font-mono">{value}</span>
  </div>
);

// Simple SVG Icons
const Icons = {
  Aperture: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/><line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/><line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/><line x1="16.62" y1="12" x2="10.88" y2="21.94"/></svg>
  ),
  Shutter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a4 4 0 0 1 4 4"/><path d="M12 6a2 2 0 0 1 2 2"/><path d="M22 12a4 4 0 0 1-4 4"/><path d="M18 12a2 2 0 0 1-2 2"/><path d="M12 22a4 4 0 0 1-4-4"/><path d="M12 18a2 2 0 0 1-2-2"/><path d="M2 12a4 4 0 0 1 4-4"/><path d="M6 12a2 2 0 0 1 2-2"/></svg>
  ),
  ISO: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
  ),
  WB: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  ),
  Lens: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M21.17 8H2.83"/><path d="M3.95 6.06L20.05 17.94"/><path d="M3.95 17.94L20.05 6.06"/></svg>
  )
};

const SettingsCard: React.FC<SettingsCardProps> = ({ settings, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">建議設定</h2>
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
              AI PRO MODE
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <SettingsItem label="Shutter" value={settings.shutterSpeed} icon={Icons.Shutter} />
            <SettingsItem label="Aperture" value={settings.aperture} icon={Icons.Aperture} />
            <SettingsItem label="ISO" value={settings.iso} icon={Icons.ISO} />
            <SettingsItem label="WB" value={settings.whiteBalance} icon={Icons.WB} />
            <SettingsItem label="Focal Length" value={settings.focalLength} icon={Icons.Lens} />
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h3 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                📸 分析結果
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {settings.explanation}
              </p>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
               <h3 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                💡 拍攝貼士
              </h3>
              <ul className="space-y-2">
                {settings.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-400">
                    <span className="text-emerald-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <button
          onClick={onReset}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl border border-slate-600 hover:border-emerald-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-500"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          影過另一張
        </button>
      </div>
    </div>
  );
};

export default SettingsCard;
