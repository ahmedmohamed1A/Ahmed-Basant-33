import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent } from '@/data/defaultContent';

interface IntroSectionProps {
  content: SiteContent;
}

export function IntroSection({ content }: IntroSectionProps) {
  const { t, lang } = useLanguage();
  const text = lang === 'ar' ? content.introAr : content.introEn;

  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="reveal glass-card rounded-3xl p-8 sm:p-12">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-pink-300" />
            <Heart
              className="text-pink-500 animate-pulse-heart"
              fill="#f5478a"
              size={18}
            />
            <div className="h-px w-8 bg-pink-300" />
          </div>

          <h2 className="mb-6 text-center font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('intro_title')}
          </h2>

          <p
            className={`text-center text-lg leading-loose text-burgundy-800/90 sm:text-xl ${
              lang === 'ar'
                ? 'font-arabic'
                : 'font-serif italic'
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
