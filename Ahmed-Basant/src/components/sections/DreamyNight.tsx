import { useMemo } from 'react';
import { Moon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent } from '@/data/defaultContent';

interface DreamyNightProps {
  content: SiteContent;
}

export function DreamyNight({ content }: DreamyNightProps) {
  const { t, lang } = useLanguage();
  const text = lang === 'ar' ? content.nightAr : content.nightEn;

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 2 + Math.random() * 5,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <section className="relative my-12 overflow-hidden px-4 py-24 sm:py-32">
      {/* Dark night background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #420d14 0%, #761d27 30%, #901f2b 60%, #4d0c22 100%)',
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
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
              boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.5)`,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div className="absolute right-10 top-12 opacity-90 sm:right-20">
        <div className="relative">
          <div className="absolute inset-0 animate-breathe rounded-full bg-cream-100/30 blur-2xl" />
          <Moon
            className="relative text-cream-100"
            fill="#fff8e6"
            size={64}
          />
        </div>
      </div>

      {/* Glowing particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-pink-300/60 animate-float-soft"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: '0 0 6px rgba(255,169,194,0.6)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2
          className={`mb-8 text-3xl sm:text-4xl font-bold text-cream-100 ${
            lang === 'ar' ? 'font-arabic' : 'font-serif'
          }`}
        >
          {t('night_title')}
        </h2>

        <p
          className={`text-lg leading-loose text-pink-100/80 sm:text-xl ${
            lang === 'ar' ? 'font-arabic' : 'font-serif italic'
          }`}
        >
          {text}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300/50" />
          <span className="text-2xl">🌙</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300/50" />
        </div>
      </div>
    </section>
  );
}
