import React, { useEffect, useState } from 'react';
import { useAudio } from '../../context/AudioContext';

interface Props {
  onComplete: () => void;
}

export const NetflixAutoLoader: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'firstLetter' | 'fullText' | 'portfolioText' | 'zoomOut'>('initial');
  const { playPowerUp } = useAudio();

  useEffect(() => {
    // Stage 1: T appears with blue light
    const t1 = setTimeout(() => {
      setPhase('firstLetter');
      playPowerUp();
    }, 200);

    // Stage 2: HAKSHNESH B unfolds
    const t2 = setTimeout(() => {
      setPhase('fullText');
    }, 900);

    // Stage 3: PORTFOLIO appears
    const t3 = setTimeout(() => {
      setPhase('portfolioText');
    }, 1600);

    // Stage 4: Netflix zoom-through expansion
    const t4 = setTimeout(() => {
      setPhase('zoomOut');
    }, 2500);

    // Stage 5: Finish and open page
    const t5 = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      onComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleSkip = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#030611] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ${
        phase === 'zoomOut' ? 'scale-150 opacity-0 pointer-events-none filter blur-sm' : 'scale-100 opacity-100'
      }`}
    >
      {/* Cinematic Royal Blue Anamorphic Glow Streak */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[800px] h-[300px] bg-gradient-to-r from-blue-600/0 via-blue-500/25 to-blue-600/0 blur-[100px] transition-all duration-1000 ${
            phase !== 'initial' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
        <div
          className={`absolute h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-[1px] transition-all duration-700 ${
            phase === 'fullText' || phase === 'portfolioText' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />
      </div>

      {/* Netflix Style Main Logo Typography Sequence */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated Brand Row */}
        <div className="flex items-center justify-center overflow-hidden py-4 px-6">
          {/* First Letter "T" - Primary Hero Letter */}
          <span
            className={`font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight transition-all duration-700 ${
              phase === 'initial'
                ? 'opacity-0 scale-50 -translate-y-6 filter blur-md'
                : 'opacity-100 scale-100 translate-y-0 text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-700 drop-shadow-[0_0_35px_rgba(37,99,235,0.8)]'
            }`}
          >
            T
          </span>

          {/* Suffix "HAKSHNESH B" - Unfolds horizontally like Netflix logo */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === 'fullText' || phase === 'portfolioText' || phase === 'zoomOut'
                ? 'max-w-[700px] opacity-100 ml-1'
                : 'max-w-0 opacity-0 ml-0'
            }`}
          >
            <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] whitespace-nowrap">
              HAKSHNESH B
            </span>
          </div>
        </div>

        {/* Subtitle "PORTFOLIO" in sleek cinematic spacing */}
        <div
          className={`overflow-hidden transition-all duration-700 ${
            phase === 'portfolioText' || phase === 'zoomOut'
              ? 'opacity-100 translate-y-0 filter blur-0'
              : 'opacity-0 translate-y-4 filter blur-sm'
          }`}
        >
          <span className="font-mono text-sm sm:text-lg md:text-xl font-bold tracking-[0.4em] uppercase text-cyan-400/90 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
            PORTFOLIO
          </span>
        </div>
      </div>

      {/* Skip Button in bottom corner */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors z-20 py-1 px-2"
      >
        Skip →
      </button>
    </div>
  );
};
