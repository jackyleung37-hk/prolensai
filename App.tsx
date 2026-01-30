import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import SettingsCard from './components/SettingsCard';
import LoadingScan from './components/LoadingScan';
import { analyzeImageForSettings } from './services/geminiService';
import { AppState, CameraSettings } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [settings, setSettings] = useState<CameraSettings | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCapture = async (file: File) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);

    try {
      // 1. Convert to Base64
      const base64Data = await convertFileToBase64(file);

      // 2. Call Gemini API
      const result = await analyzeImageForSettings(base64Data);
      
      setSettings(result);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      setErrorMsg("分析失敗，請檢查網絡或重試。");
    }
  };

  const handleReset = () => {
    setSettings(null);
    setAppState(AppState.IDLE);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0 pointer-events-none"></div>

      <main className="relative z-10 w-full min-h-screen flex flex-col items-center">
        {/* Header */}
        <header className="w-full p-4 flex justify-between items-center border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center">
              <span className="font-bold text-white text-lg">P</span>
            </div>
            <span className="font-semibold tracking-wide text-slate-200">ProLens AI</span>
          </div>
          <div className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded">
            v1.0 BETA
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 w-full max-w-4xl p-4 flex flex-col justify-center">
          {appState === AppState.IDLE && (
            <CameraCapture onCapture={handleCapture} />
          )}

          {appState === AppState.ANALYZING && (
             <LoadingScan />
          )}

          {appState === AppState.SUCCESS && settings && (
            <SettingsCard settings={settings} onReset={handleReset} />
          )}

          {appState === AppState.ERROR && (
            <div className="flex flex-col items-center justify-center p-8 bg-red-950/30 border border-red-900/50 rounded-2xl max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <h3 className="text-xl font-bold text-red-200 mb-2">出錯了</h3>
              <p className="text-red-300 text-center mb-6">{errorMsg || "無法分析圖片"}</p>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors"
              >
                試多次
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-slate-600 text-xs">
          <p>Powered by Google Gemini 2.0</p>
        </footer>
      </main>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
