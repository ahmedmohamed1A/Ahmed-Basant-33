import { Plus, Trash2, Pencil, Save, X, Camera } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent, GalleryPhoto } from '@/data/defaultContent';
import { ImageUpload } from '@/components/ImageUpload';
import { generateId } from '@/utils/helpers';

interface PhotoGalleryProps {
  content: SiteContent;
  setContent: (
    updater: (prev: SiteContent) => SiteContent
  ) => void;
}

export function PhotoGallery({ content, setContent }: PhotoGalleryProps) {
  const { t, lang } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const addPhoto = () => {
    const newPhoto: GalleryPhoto = {
      id: generateId(),
      photo: null,
      date: '',
      captionAr: '',
      captionEn: '',
      locationAr: '',
      locationEn: '',
      descAr: '',
      descEn: '',
    };
    setContent((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newPhoto],
    }));
    setAdding(false);
    setEditingId(newPhoto.id);
  };

  const updatePhoto = (id: string, updates: Partial<GalleryPhoto>) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  };

  const deletePhoto = (id: string) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((p) => p.id !== id),
    }));
  };

  return (
    <section id="gallery" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-10 text-center">
          <h2 className="font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('gallery_title')}
          </h2>
          <p className="mt-3 text-base text-burgundy-600/70 font-arabic">
            {t('gallery_subtitle')}
          </p>
        </div>

        {/* Add button */}
        <div className="reveal mb-8 flex justify-center">
          <button
            onClick={addPhoto}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-burgundy-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
          >
            <Plus size={18} /> {t('gallery_add')}
          </button>
        </div>

        {/* Gallery grid */}
        {content.gallery.length === 0 ? (
          <div className="reveal flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pink-200/60 bg-pink-50/30 py-16 text-center">
            <Camera className="mb-4 text-pink-300" size={48} />
            <p
              className={`text-burgundy-500/60 ${
                lang === 'ar' ? 'font-arabic' : ''
              }`}
            >
              {lang === 'ar'
                ? 'لسه مفيش صور — ضيف أول صورة لذكرياتكم ❤️'
                : 'No photos yet — add your first memory ❤️'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.gallery.map((photo, idx) => (
              <PolaroidCard
                key={photo.id}
                photo={photo}
                index={idx}
                lang={lang}
                t={t}
                editing={editingId === photo.id}
                onEdit={() =>
                  setEditingId(
                    editingId === photo.id ? null : photo.id
                  )
                }
                onUpdate={(updates) => updatePhoto(photo.id, updates)}
                onDelete={() => deletePhoto(photo.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { formatDateDisplay } from '@/utils/helpers';

function PolaroidCard({
  photo,
  index,
  lang,
  t,
  editing,
  onEdit,
  onUpdate,
  onDelete,
}: {
  photo: GalleryPhoto;
  index: number;
  lang: 'ar' | 'en';
  t: (key: import('@/data/translations').TranslationKey) => string;
  editing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Partial<GalleryPhoto>) => void;
  onDelete: () => void;
}) {
  const rotation = (index % 3) - 1;

  if (editing) {
    return (
      <div
        className="glass-card rounded-2xl p-4 space-y-3"
        style={{ transform: `rotate(0deg)` }}
      >
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

        <div className="h-40">
          <ImageUpload
            photo={photo.photo}
            onChange={(p) => onUpdate({ photo: p })}
          />
        </div>

        <input
          type="date"
          value={photo.date}
          onChange={(e) => onUpdate({ date: e.target.value })}
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
        <input
          type="text"
          placeholder={t('caption_label')}
          value={lang === 'ar' ? photo.captionAr : photo.captionEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ captionAr: e.target.value })
              : onUpdate({ captionEn: e.target.value })
          }
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
        <input
          type="text"
          placeholder={t('location_label')}
          value={lang === 'ar' ? photo.locationAr : photo.locationEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ locationAr: e.target.value })
              : onUpdate({ locationEn: e.target.value })
          }
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
        <textarea
          rows={2}
          placeholder={t('description_label')}
          value={lang === 'ar' ? photo.descAr : photo.descEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ descAr: e.target.value })
              : onUpdate({ descEn: e.target.value })
          }
          className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
      </div>
    );
  }

  return (
    <div
      className="reveal group relative cursor-pointer transition-transform hover:scale-105 hover:rotate-0"
      style={{
        transform: `rotate(${rotation * 1.5}deg)`,
        transition: 'transform 0.3s ease',
      }}
    >
      <div className="rounded-2xl bg-white p-3 pb-12 shadow-lg shadow-pink-500/10 transition-shadow hover:shadow-xl hover:shadow-pink-500/20">
        {/* Photo area */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-pink-100 via-pink-50 to-cream-100">
          {photo.photo ? (
            <img
              src={photo.photo}
              alt="memory"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-pink-200/40" />
                <div className="mx-auto h-3 w-20 rounded-full bg-pink-200/40" />
              </div>
            </div>
          )}

          {/* Hover edit button */}
          <button
            onClick={onEdit}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-pink-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          >
            <Pencil size={14} />
          </button>
        </div>

        {/* Caption area */}
        <div className="mt-3 px-1">
          <p className="text-center font-script text-lg text-burgundy-700">
            {(lang === 'ar' ? photo.captionAr : photo.captionEn) ||
              (lang === 'ar' ? 'ذكرى حلوة' : 'A sweet memory')}
          </p>
          {photo.date && (
            <p className="mt-1 text-center text-xs text-pink-400/70">
              {formatDateDisplay(photo.date, lang)}
            </p>
          )}
          {(lang === 'ar' ? photo.locationAr : photo.locationEn) && (
            <p className="mt-0.5 text-center text-xs text-burgundy-400/60">
              📍 {lang === 'ar' ? photo.locationAr : photo.locationEn}
            </p>
          )}
          {(lang === 'ar' ? photo.descAr : photo.descEn) && (
            <p
              className={`mt-2 text-center text-xs text-burgundy-600/70 ${
                lang === 'ar' ? 'font-arabic' : ''
              }`}
            >
              {lang === 'ar' ? photo.descAr : photo.descEn}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
