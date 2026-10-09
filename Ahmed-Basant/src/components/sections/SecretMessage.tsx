import { useState, useEffect, useRef } from 'react';
import { X, Heart, Pencil, Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent } from '@/data/defaultContent';

interface SecretMessageProps {
  content: SiteContent;
  setContent: (
    updater: (prev: SiteContent) => SiteContent
  ) => void;
}

export function SecretMessage({ content, setContent }: SecretMessageProps) {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullText =
    lang === 'ar' ? content.secretMessageAr : content.secretMessageEn;
  const isAr = lang === 'ar';

  useEffect(() => {
    if (isOpen && !hasTyped && !isEditing) {
      setTypedText('');
      let i = 0;
      timerRef.current = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          setHasTyped(true);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 30);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, hasTyped, isEditing, fullText]);

  const handleOpen = () => {
    setHasTyped(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsEditing(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <>
      {/* Floating secret heart button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-burgundy-500 text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-110 animate-pulse-heart"
        style={{ [lang === 'ar' ? 'left' : 'right']: '1.5rem' } as React.CSSProperties}
        aria-label="secret message"
      >
        <Heart size={24} fill="white" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/60 to-burgundy-900/60 backdrop-blur-md animate-fade-in" />

          <div
            className="relative z-10 w-full max-w-lg rounded-3xl bg-gradient-to-br from-pink-100 via-pink-50 to-cream-100 p-8 shadow-2xl animate-scale-in border-2 border-pink-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative hearts */}
            <Heart
              className="absolute -top-3 -left-3 text-pink-300 animate-pulse-heart"
              fill="#ffa3c2"
              size={24}
            />
            <Heart
              className="absolute -bottom-3 -right-3 text-pink-300 animate-pulse-heart"
              fill="#ffa3c2"
              size={20}
              style={{ animationDelay: '0.5s' }}
            />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gradient-rose">
                {t('secret_title')}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing((v) => !v)}
                  className="rounded-full bg-pink-200/50 p-2 text-pink-600 transition-colors hover:bg-pink-300/50"
                >
                  {isEditing ? <Save size={16} /> : <Pencil size={16} />}
                </button>
                <button
                  onClick={handleClose}
                  className="rounded-full bg-pink-200/50 p-2 text-pink-600 transition-colors hover:bg-pink-300/50"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {isEditing ? (
              <textarea
                rows={5}
                value={fullText}
                onChange={(e) =>
                  isAr
                    ? setContent((prev) => ({
                        ...prev,
                        secretMessageAr: e.target.value,
                      }))
                    : setContent((prev) => ({
                        ...prev,
                        secretMessageEn: e.target.value,
                      }))
                }
                className={`w-full rounded-xl border border-pink-200 bg-white/70 p-4 text-base leading-loose text-burgundy-800 outline-none focus:border-pink-400 ${
                  isAr ? 'font-arabic text-right' : 'font-serif italic'
                }`}
              />
            ) : (
              <p
                className={`text-base leading-loose text-burgundy-800 typing-cursor ${
                  isAr ? 'font-arabic text-right' : 'font-serif italic text-left'
                }`}
              >
                {typedText}
              </p>
            )}

            <div className="mt-6 flex items-center justify-center">
              <Heart
                className="text-pink-400 animate-pulse-heart"
                fill="#f5478a"
                size={20}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
