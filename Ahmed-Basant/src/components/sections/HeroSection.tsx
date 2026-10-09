import { Heart, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { scrollToSection } from '@/utils/helpers';

export function HeroSection() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-pink-200/40 blur-3xl animate-breathe" />
      </div>

      {/* Decorative rose SVGs */}
      <RoseDecoration />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p
          className={`mb-3 text-sm font-medium tracking-widest text-pink-500/70 uppercase animate-fade-in ${
            lang === 'ar' ? 'font-arabic' : 'font-sans'
          }`}
        >
          {t('hero_subtitle')}
        </p>

        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl text-gradient-rose animate-fade-in-up">
          {t('hero_title')}
        </h1>

        <div className="my-5 flex items-center gap-3 animate-fade-in">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400" />
          <Heart
            className="text-pink-500 animate-pulse-heart"
            fill="#f5478a"
            size={20}
          />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400" />
        </div>

        <p className="font-arabic text-2xl sm:text-3xl text-burgundy-700 animate-fade-in-up reveal-delay-2">
          {t('hero_date')}
        </p>

        <p
          className={`mt-3 max-w-md text-base sm:text-lg text-burgundy-600/80 animate-fade-in-up reveal-delay-3 ${
            lang === 'ar' ? 'font-arabic' : 'font-sans italic'
          }`}
        >
          {t('hero_tagline')}
        </p>

        <button
          onClick={() => scrollToSection('story')}
          className="group mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-burgundy-600 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/40 animate-fade-in-up reveal-delay-4"
        >
          {t('hero_cta')}
          <ChevronDown
            size={20}
            className="transition-transform group-hover:translate-y-1"
          />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ChevronDown
          className="text-pink-400/60 animate-bounce-soft"
          size={28}
        />
      </div>
    </section>
  );
}

function RoseDecoration() {
  return (
    <>
      <svg
        className="absolute left-4 top-20 w-24 h-24 opacity-30 animate-float-soft sm:w-32 sm:h-32"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="20" fill="#ff6fa0" opacity="0.3" />
        <circle cx="50" cy="50" r="14" fill="#f5478a" opacity="0.4" />
        <circle cx="50" cy="50" r="8" fill="#b51c52" opacity="0.3" />
        <path
          d="M50 30 Q40 35 40 50 Q40 60 50 60 Q60 60 60 50 Q60 35 50 30"
          fill="#ffa3c2"
          opacity="0.5"
        />
      </svg>
      <svg
        className="absolute right-4 bottom-20 w-28 h-28 opacity-25 animate-float-soft sm:w-40 sm:h-32"
        style={{ animationDelay: '1.5s' }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="22" fill="#ff6fa0" opacity="0.25" />
        <circle cx="50" cy="50" r="15" fill="#f5478a" opacity="0.35" />
        <circle cx="50" cy="50" r="9" fill="#b51c52" opacity="0.25" />
      </svg>
    </>
  );
}
