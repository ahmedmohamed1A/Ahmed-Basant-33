import { useState } from 'react';
import { Plus, Trash2, Pencil, Save, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent, ImportantDate } from '@/data/defaultContent';
import { ImageUpload } from '@/components/ImageUpload';
import { generateId, formatDateDisplay } from '@/utils/helpers';

interface ImportantDatesProps {
  content: SiteContent;
  setContent: (
    updater: (prev: SiteContent) => SiteContent
  ) => void;
}

export function ImportantDates({
  content,
  setContent,
}: ImportantDatesProps) {
  const { t, lang } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);

  const addDate = () => {
    const newDate: ImportantDate = {
      id: generateId(),
      date: '',
      titleAr: '',
      titleEn: '',
      descAr: '',
      descEn: '',
      photo: null,
    };
    setContent((prev) => ({
      ...prev,
      dates: [...prev.dates, newDate],
    }));
    setEditingId(newDate.id);
  };

  const updateDate = (id: string, updates: Partial<ImportantDate>) => {
    setContent((prev) => ({
      ...prev,
      dates: prev.dates.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    }));
  };

  const deleteDate = (id: string) => {
    setContent((prev) => ({
      ...prev,
      dates: prev.dates.filter((d) => d.id !== id),
    }));
  };

  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="reveal mb-10 text-center">
          <h2 className="font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('dates_title')}
          </h2>
          <p className="mt-3 text-base text-burgundy-600/70 font-arabic">
            {t('dates_subtitle')}
          </p>
        </div>

        <div className="reveal mb-8 flex justify-center">
          <button
            onClick={addDate}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-burgundy-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
          >
            <Plus size={18} /> {t('dates_add')}
          </button>
        </div>

        <div className="space-y-4">
          {content.dates.map((item) => (
            <DateCard
              key={item.id}
              item={item}
              lang={lang}
              t={t}
              editing={editingId === item.id}
              onEdit={() =>
                setEditingId(
                  editingId === item.id ? null : item.id
                )
              }
              onUpdate={(updates) => updateDate(item.id, updates)}
              onDelete={() => deleteDate(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DateCard({
  item,
  lang,
  t,
  editing,
  onEdit,
  onUpdate,
  onDelete,
}: {
  item: ImportantDate;
  lang: 'ar' | 'en';
  t: (key: import('@/data/translations').TranslationKey) => string;
  editing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Partial<ImportantDate>) => void;
  onDelete: () => void;
}) {
  if (editing) {
    return (
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-pink-600">
            {t('edit_mode')}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 rounded-lg bg-pink-500 px-3 py-1.5 text-xs font-medium text-white"
            >
              <Save size={14} /> {t('save')}
            </button>
            <button
              onClick={onDelete}
              className="rounded-lg bg-red-100 p-1.5 text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <input
          type="date"
          value={item.date}
          onChange={(e) => onUpdate({ date: e.target.value })}
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
        <input
          type="text"
          placeholder={t('title_label')}
          value={lang === 'ar' ? item.titleAr : item.titleEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ titleAr: e.target.value })
              : onUpdate({ titleEn: e.target.value })
          }
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
        <textarea
          rows={2}
          placeholder={t('description_label')}
          value={lang === 'ar' ? item.descAr : item.descEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ descAr: e.target.value })
              : onUpdate({ descEn: e.target.value })
          }
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
        <div className="h-28">
          <ImageUpload
            photo={item.photo}
            onChange={(photo) => onUpdate({ photo })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="reveal group relative flex items-start gap-4 rounded-2xl glass-card p-5 transition-all hover:shadow-lg hover:shadow-pink-500/10">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-burgundy-500 text-white shadow-md">
        <Calendar size={22} />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-burgundy-800">
          {lang === 'ar' ? item.titleAr : item.titleEn}
        </h3>
        {item.date && (
          <p className="text-sm font-medium text-pink-500">
            {formatDateDisplay(item.date, lang)}
          </p>
        )}
        {(lang === 'ar' ? item.descAr : item.descEn) && (
          <p
            className={`mt-1 text-sm text-burgundy-600/80 ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {lang === 'ar' ? item.descAr : item.descEn}
          </p>
        )}
        {item.photo && (
          <img
            src={item.photo}
            alt={lang === 'ar' ? item.titleAr : item.titleEn}
            className="mt-3 w-full max-w-xs rounded-lg object-cover shadow-sm"
          />
        )}
      </div>

      <button
        onClick={onEdit}
        className="rounded-lg p-2 text-pink-400/60 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-pink-100 hover:text-pink-600"
      >
        <Pencil size={16} />
      </button>
    </div>
  );
}
