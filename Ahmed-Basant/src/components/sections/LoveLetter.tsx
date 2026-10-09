import { useState, useEffect, useRef } from 'react';
import { Mail, X, Pencil, Save, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent } from '@/data/defaultContent';

interface LoveLetterProps {
  content: SiteContent;
  setContent: (
    updater: (prev: SiteContent) => SiteContent
  ) => void;
}

export function LoveLetter({ content, setContent }: LoveLetterProps) {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullText = lang === 'ar' ? content.letterAr : content.letterEn;
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
      }, 25);
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
    <section id="letter" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="reveal mb-8 text-center">
          <h2 className="font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('letter_title')}
          </h2>
        </div>

        <div className="reveal flex justify-center">
          <button
            onClick={handleOpen}
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-burgundy-600 to-pink-500 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-burgundy-500/30 transition-all hover:scale-105 hover:shadow-xl"
          >
            <Mail size={22} className="transition-transform group-hover:rotate-12" />
            {t('letter_open')}
          </button>
        </div>
      </div>

      {/* Modal letter */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-burgundy-900/40 backdrop-blur-sm animate-fade-in" />

          <div
            className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl shadow-2xl animate-scale-in"
            style={{
              background: 'linear-gradient(135deg, #fffdf3 0%, #fff8e6 50%, #fff0d0 100%)',
              border: '2px solid #ffc9dd',
              boxShadow: '0 20px 60px rgba(181,28,82,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Rose decorations on corners */}
            <CornerRose className="absolute left-2 top-2 w-12 h-12 opacity-30" />
            <CornerRose className="absolute right-2 top-2 w-12 h-12 opacity-30 rotate-90" />
            <CornerRose className="absolute left-2 bottom-2 w-12 h-12 opacity-30 -rotate-90" />
            <CornerRose className="absolute right-2 bottom-2 w-12 h-12 opacity-30 rotate-180" />

            {/* Close / Edit buttons */}
            <div className="flex justify-end gap-2 p-4">
              <button
                onClick={() => setIsEditing((v) => !v)}
                className="rounded-full bg-pink-100 p-2 text-pink-600 transition-colors hover:bg-pink-200"
              >
                {isEditing ? <Save size={18} /> : <Pencil size={18} />}
              </button>
              <button
                onClick={handleClose}
                className="rounded-full bg-pink-100 p-2 text-pink-600 transition-colors hover:bg-pink-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-10 sm:px-12">
              {isEditing ? (
                <textarea
                  rows={14}
                  value={fullText}
                  onChange={(e) =>
                    isAr
                      ? setContent((prev) => ({
                          ...prev,
                          letterAr: e.target.value,
                        }))
                      : setContent((prev) => ({
                          ...prev,
                          letterEn: e.target.value,
                        }))
                  }
                  className={`w-full rounded-xl border border-pink-200 bg-white/70 p-4 text-base leading-loose text-burgundy-800 outline-none focus:border-pink-400 ${
                    isAr ? 'font-arabic' : 'font-serif italic'
                  }`}
                />
              ) : (
                <div
                  className={`whitespace-pre-wrap text-base leading-loose text-burgundy-800 typing-cursor ${
                    isAr ? 'font-arabic' : 'font-serif italic'
                  } ${isAr ? 'text-right' : 'text-left'}`}
                >
                  {typedText}
                </div>
              )}

              <div className="mt-8 flex items-center justify-end gap-2">
                <Heart className="text-pink-400" fill="#f5478a" size={16} />
                <span className="font-script text-xl text-burgundy-700">
                  {t('letter_from')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CornerRose({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="12" fill="#ff6fa0" opacity="0.3" />
      <circle cx="30" cy="30" r="8" fill="#f5478a" opacity="0.4" />
      <circle cx="30" cy="30" r="5" fill="#b51c52" opacity="0.3" />
      <path
        d="M30 15 Q22 20 22 30 Q22 38 30 38 Q38 38 38 30 Q38 20 30 15"
        fill="#ffa3c2"
        opacity="0.4"
      />
    </svg>
  );
}
