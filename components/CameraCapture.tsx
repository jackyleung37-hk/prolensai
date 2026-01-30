import React, { useRef } from 'react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  disabled?: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCapture(e.target.files[0]);
      // Reset value so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4 text-center space-y-8">
      <div className="relative group cursor-pointer" onClick={!disabled ? handleClick : undefined}>
        {/* Animated Rings */}
        <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500 animate-pulse"></div>
        <div className="absolute -inset-4 border border-emerald-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100"></div>
        
        {/* Main Button */}
        <button
          disabled={disabled}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 z-10 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </button>
      </div>
      
      <div className="space-y-2 max-w-sm">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          ProLens AI
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          用手機影低現場環境<br/>
          即時獲取專業單反相機設定建議
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment" // Forces rear camera on mobile
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CameraCapture;
