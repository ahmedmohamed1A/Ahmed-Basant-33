import { useMemo } from 'react';
import { Heart, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { scrollToSection } from '@/utils/helpers';

export function FinalSection() {
  const { t, lang } = useLanguage();

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    []
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 80,
      })),
    []
  );

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      {/* Dark pink gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #4d0c22 0%, #761d27 40%, #901f2b 70%, #420d14 100%)',
        }}
      />

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.4)`,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-20px] animate-float-up"
          style={
            {
              left: `${h.left}%`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              '--drift': `${h.drift}px`,
              opacity: 0.3,
            } as React.CSSProperties
          }
        >
          <Heart
            fill="#ff6fa0"
            color="#f5478a"
            style={{ width: h.size, height: h.size }}
          />
        </div>
      ))}

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-3xl animate-breathe" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="reveal mb-6 flex items-center justify-center">
          <Heart
            className="text-pink-400 animate-pulse-heart"
            fill="#f5478a"
            size={36}
          />
        </div>

        <h2 className="reveal font-script text-5xl sm:text-6xl text-cream-100">
          {t('final_title')}
        </h2>

        <p
          className={`reveal mt-6 text-xl text-pink-200/80 ${
            lang === 'ar' ? 'font-arabic' : 'font-serif'
          }`}
        >
          {t('final_since')}
        </p>

        <p
          className={`reveal mt-2 text-2xl font-bold text-pink-100 ${
            lang === 'ar' ? 'font-arabic' : 'font-serif italic'
          }`}
        >
          {t('final_tagline')}
        </p>

        <button
          onClick={() => scrollToSection('hero')}
          className="reveal mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105"
        >
          <ChevronUp size={20} />
          {t('final_back_to_top')}
        </button>
      </div>
    </section>
  );
}
