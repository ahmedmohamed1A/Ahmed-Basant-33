import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useNow } from '@/hooks/useNow';
import { STORY_START_DATE } from '@/data/defaultContent';

export function LoveCounter() {
  const { t, lang } = useLanguage();
  const now = useNow(1000);

  const start = new Date(STORY_START_DATE).getTime();
  const elapsed = now.getTime() - start;

  const isNegative = elapsed < 0;
  const absElapsed = Math.abs(elapsed);

  const days = Math.floor(absElapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absElapsed / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absElapsed / (1000 * 60)) % 60);
  const seconds = Math.floor((absElapsed / 1000) % 60);

  const units = [
    { value: days, label: t('counter_days') },
    { value: hours, label: t('counter_hours') },
    { value: minutes, label: t('counter_minutes') },
    { value: seconds, label: t('counter_seconds') },
  ];

  return (
    <section className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="reveal glass-card rounded-3xl p-8 sm:p-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400" />
            <Heart
              className="text-pink-500 animate-pulse-heart"
              fill="#f5478a"
              size={20}
            />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400" />
          </div>

          <h2
            className={`mb-8 text-xl sm:text-2xl font-bold text-burgundy-800 ${
              lang === 'ar' ? 'font-arabic' : 'font-serif'
            }`}
          >
            {t('counter_title')}
          </h2>

          {isNegative && (
            <p className="mb-4 text-sm text-pink-500/70 font-arabic">
              {lang === 'ar'
                ? 'حكايتنا لسه هتبدأ يوم ٢٦ أغسطس ٢٠٢٦ ❤️'
                : 'Our story begins on 26 August 2026 ❤️'}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="relative flex flex-col items-center"
              >
                <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-cream-100 p-4 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                  <div className="relative text-3xl font-bold text-burgundy-700 sm:text-4xl tabular-nums">
                    {unit.value.toLocaleString(
                      lang === 'ar' ? 'ar-EG' : 'en'
                    )}
                  </div>
                </div>
                <div className="mt-2 text-xs font-medium text-pink-500/70 sm:text-sm">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          <p
            className={`mt-8 text-sm text-burgundy-600/70 ${
              lang === 'ar' ? 'font-arabic' : 'italic'
            }`}
          >
            {t('counter_caption')}
          </p>
        </div>
      </div>
    </section>
  );
}
