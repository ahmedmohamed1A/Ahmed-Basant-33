import { useState } from 'react';
import { Plus, Trash2, Pencil, Save, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent, SpecialMoment } from '@/data/defaultContent';
import { ImageUpload } from '@/components/ImageUpload';
import { generateId, formatDateDisplay } from '@/utils/helpers';

interface SpecialMomentsProps {
  content: SiteContent;
  setContent: (
    updater: (prev: SiteContent) => SiteContent
  ) => void;
}

export function SpecialMoments({ content, setContent }: SpecialMomentsProps) {
  const { t, lang } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);

  const addMoment = () => {
    const newMoment: SpecialMoment = {
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
      moments: [...prev.moments, newMoment],
    }));
    setEditingId(newMoment.id);
  };

  const updateMoment = (id: string, updates: Partial<SpecialMoment>) => {
    setContent((prev) => ({
      ...prev,
      moments: prev.moments.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    }));
  };

  const deleteMoment = (id: string) => {
    setContent((prev) => ({
      ...prev,
      moments: prev.moments.filter((m) => m.id !== id),
    }));
  };

  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-10 text-center">
          <h2 className="font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('moments_title')}
          </h2>
          <p className="mt-3 text-base text-burgundy-600/70 font-arabic">
            {t('moments_subtitle')}
          </p>
        </div>

        <div className="reveal mb-8 flex justify-center">
          <button
            onClick={addMoment}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-burgundy-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
          >
            <Plus size={18} /> {t('moments_add')}
          </button>
        </div>

        {content.moments.length === 0 ? (
          <div className="reveal flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pink-200/60 bg-pink-50/30 py-12 text-center">
            <Calendar className="mb-4 text-pink-300" size={40} />
            <p className={`text-burgundy-500/60 ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'ar'
                ? 'ضيف أول لحظة مميزة في حكايتكم ❤️'
                : 'Add your first special moment ❤️'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.moments.map((moment) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                lang={lang}
                t={t}
                editing={editingId === moment.id}
                onEdit={() =>
                  setEditingId(
                    editingId === moment.id ? null : moment.id
                  )
                }
                onUpdate={(updates) => updateMoment(moment.id, updates)}
                onDelete={() => deleteMoment(moment.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MomentCard({
  moment,
  lang,
  t,
  editing,
  onEdit,
  onUpdate,
  onDelete,
}: {
  moment: SpecialMoment;
  lang: 'ar' | 'en';
  t: (key: import('@/data/translations').TranslationKey) => string;
  editing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Partial<SpecialMoment>) => void;
  onDelete: () => void;
}) {
  if (editing) {
    return (
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-pink-600">{t('edit_mode')}</span>
          <div className="flex gap-2">
            <button onClick={onEdit} className="flex items-center gap-1 rounded-lg bg-pink-500 px-3 py-1.5 text-xs font-medium text-white">
              <Save size={14} /> {t('save')}
            </button>
            <button onClick={onDelete} className="rounded-lg bg-red-100 p-1.5 text-red-500">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <input type="date" value={moment.date} onChange={(e) => onUpdate({ date: e.target.value })}
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400" />
        <input type="text" placeholder={t('title_label')} value={lang === 'ar' ? moment.titleAr : moment.titleEn}
          onChange={(e) => lang === 'ar' ? onUpdate({ titleAr: e.target.value }) : onUpdate({ titleEn: e.target.value })}
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400" />
        <textarea rows={2} placeholder={t('description_label')} value={lang === 'ar' ? moment.descAr : moment.descEn}
          onChange={(e) => lang === 'ar' ? onUpdate({ descAr: e.target.value }) : onUpdate({ descEn: e.target.value })}
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400" />
        <div className="h-28">
          <ImageUpload photo={moment.photo} onChange={(photo) => onUpdate({ photo })} />
        </div>
      </div>
    );
  }

  return (
    <div className="reveal group relative overflow-hidden rounded-2xl glass-card p-6 transition-all hover:shadow-xl hover:shadow-pink-500/10">
      <button onClick={onEdit} className="absolute end-2 top-2 rounded-full bg-white/90 p-2 text-pink-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        <Pencil size={14} />
      </button>

      {moment.photo && (
        <img src={moment.photo} alt={lang === 'ar' ? moment.titleAr : moment.titleEn}
          className="mb-4 w-full rounded-xl object-cover shadow-sm" style={{ maxHeight: '200px' }} />
      )}

      <h3 className="text-lg font-bold text-burgundy-800">
        {lang === 'ar' ? moment.titleAr : moment.titleEn}
      </h3>
      {moment.date && (
        <p className="mt-1 text-sm font-medium text-pink-500">
          {formatDateDisplay(moment.date, lang)}
        </p>
      )}
      {(lang === 'ar' ? moment.descAr : moment.descEn) && (
        <p className={`mt-2 text-sm text-burgundy-600/80 ${lang === 'ar' ? 'font-arabic' : ''}`}>
          {lang === 'ar' ? moment.descAr : moment.descEn}
        </p>
      )}
    </div>
  );
}
