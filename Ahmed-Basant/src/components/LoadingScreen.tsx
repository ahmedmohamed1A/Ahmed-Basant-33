import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { t } = useLanguage();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const doneTimer = setTimeout(() => onDone(), 2900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-cream-100 transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing heart behind */}
        <div className="absolute -inset-8 rounded-full bg-pink-200/30 blur-2xl animate-breathe" />

        <h1 className="relative font-script text-5xl sm:text-6xl text-gradient-rose animate-fade-in-up">
          {t('hero_title')}
        </h1>

        <div className="relative mt-6 mb-4 animate-pulse-heart">
          <Heart
            className="text-pink-500"
            fill="#f5478a"
            size={48}
          />
        </div>

        <p className="relative font-arabic text-lg text-pink-700/80 animate-fade-in">
          {t('loading_text')}
        </p>

        {/* Loading bar */}
        <div className="relative mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-pink-200/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 to-burgundy-500"
            style={{ animation: 'shimmer 2s ease-in-out forwards' }}
          />
        </div>
      </div>
    </div>
  );
}
