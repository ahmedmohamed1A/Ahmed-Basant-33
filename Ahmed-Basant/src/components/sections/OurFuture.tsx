import {
  Mail,
  Gem,
  Home,
  Heart,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent } from '@/data/defaultContent';

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Gem,
  Home,
  Heart,
};

interface OurFutureProps {
  content: SiteContent;
}

export function OurFuture({ content }: OurFutureProps) {
  const { t, lang } = useLanguage();

  return (
    <section id="future" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-12 text-center">
          <h2 className="font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('future_title')}
          </h2>
          <p className="mt-3 text-base text-burgundy-600/70 font-arabic">
            {t('future_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.futureCards.map((card, idx) => {
            const Icon = iconMap[card.icon] ?? Heart;
            return (
              <div
                key={card.id}
                className={`reveal glass-card rounded-2xl p-8 text-center transition-all hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 reveal-delay-${
                  idx + 1
                }`}
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-pink-100 shadow-inner">
                  <Icon className="text-pink-600" size={28} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-burgundy-800">
                  {lang === 'ar' ? card.titleAr : card.titleEn}
                </h3>

                <p
                  className={`text-sm leading-relaxed text-burgundy-600/80 ${
                    lang === 'ar' ? 'font-arabic' : ''
                  }`}
                >
                  {lang === 'ar' ? card.descAr : card.descEn}
                </p>

                <div className="mt-5 flex items-center justify-center">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
