import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Sparkles,
  Camera,
  Cake,
  Mail,
  Gem,
  Infinity,
  Lock,
  Plus,
  Trash2,
  Save,
  Pencil,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type {
  SiteContent,
  TimelineChapter,
  ConversationEntry,
} from '@/data/defaultContent';
import { ImageUpload } from '@/components/ImageUpload';
import { generateId } from '@/utils/helpers';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  MessageCircle,
  Sparkles,
  Camera,
  Cake,
  Mail,
  Gem,
  Infinity,
};

interface StoryTimelineProps {
  content: SiteContent;
  setContent: (
    updater: (prev: SiteContent) => SiteContent
  ) => void;
}

export function StoryTimeline({ content, setContent }: StoryTimelineProps) {
  const { t, lang } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateChapter = (id: string, updates: Partial<TimelineChapter>) => {
    setContent((prev) => ({
      ...prev,
      timeline: prev.timeline.map((ch) =>
        ch.id === id ? { ...ch, ...updates } : ch
      ),
    }));
  };

  const addConversation = (chapterId: string) => {
    const newConv: ConversationEntry = {
      id: generateId(),
      labelAr: 'ذكرى جديدة',
      labelEn: 'New Memory',
      textAr: '',
      textEn: '',
      photo: null,
    };
    setContent((prev) => ({
      ...prev,
      timeline: prev.timeline.map((ch) =>
        ch.id === chapterId
          ? { ...ch, conversations: [...(ch.conversations ?? []), newConv] }
          : ch
      ),
    }));
  };

  const updateConversation = (
    chapterId: string,
    convId: string,
    updates: Partial<ConversationEntry>
  ) => {
    setContent((prev) => ({
      ...prev,
      timeline: prev.timeline.map((ch) =>
        ch.id === chapterId
          ? {
              ...ch,
              conversations: ch.conversations?.map((c) =>
                c.id === convId ? { ...c, ...updates } : c
              ),
            }
          : ch
      ),
    }));
  };

  const deleteConversation = (chapterId: string, convId: string) => {
    setContent((prev) => ({
      ...prev,
      timeline: prev.timeline.map((ch) =>
        ch.id === chapterId
          ? {
              ...ch,
              conversations: ch.conversations?.filter(
                (c) => c.id !== convId
              ),
            }
          : ch
      ),
    }));
  };

  const unlockChapter = (id: string) => {
    updateChapter(id, { isLocked: false });
  };

  return (
    <section id="story" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="reveal mb-12 text-center">
          <h2 className="font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('story_title')}
          </h2>
          <p className="mt-3 text-base text-burgundy-600/70 font-arabic">
            {t('story_subtitle')}
          </p>
        </div>

        {/* Timeline line */}
        <div className="relative">
          <div
            className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 via-pink-400 to-burgundy-400 ${
              lang === 'ar' ? 'right-4 sm:right-1/2 sm:translate-x-px' : 'left-4 sm:left-1/2 sm:-translate-x-px'
            }`}
          />

          <div className="space-y-8">
            {content.timeline.map((chapter, idx) => (
              <TimelineCard
                key={chapter.id}
                chapter={chapter}
                index={idx}
                lang={lang}
                t={t}
                editing={editingId === chapter.id}
                onEdit={() =>
                  setEditingId(
                    editingId === chapter.id ? null : chapter.id
                  )
                }
                onUpdate={(updates) => updateChapter(chapter.id, updates)}
                onUnlock={() => unlockChapter(chapter.id)}
                onAddConversation={() => addConversation(chapter.id)}
                onUpdateConversation={(convId, updates) =>
                  updateConversation(chapter.id, convId, updates)
                }
                onDeleteConversation={(convId) =>
                  deleteConversation(chapter.id, convId)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineCardProps {
  chapter: TimelineChapter;
  index: number;
  lang: 'ar' | 'en';
  t: (key: import('@/data/translations').TranslationKey) => string;
  editing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Partial<TimelineChapter>) => void;
  onUnlock: () => void;
  onAddConversation: () => void;
  onUpdateConversation: (
    convId: string,
    updates: Partial<ConversationEntry>
  ) => void;
  onDeleteConversation: (convId: string) => void;
}

function TimelineCard({
  chapter,
  index,
  lang,
  t,
  editing,
  onEdit,
  onUpdate,
  onUnlock,
  onAddConversation,
  onUpdateConversation,
  onDeleteConversation,
}: TimelineCardProps) {
  const Icon = iconMap[chapter.icon] ?? Heart;
  const isRight = index % 2 === 0;
  const title = lang === 'ar' ? chapter.titleAr : chapter.titleEn;
  const desc = lang === 'ar' ? chapter.descAr : chapter.descEn;
  const date = lang === 'ar' ? chapter.dateAr : chapter.dateEn;
  const location =
    lang === 'ar' ? chapter.locationAr : chapter.locationEn;

  return (
    <div
      className={`reveal relative flex ${
        isRight
          ? lang === 'ar'
            ? 'sm:flex-row-reverse'
            : 'sm:flex-row'
          : lang === 'ar'
          ? 'sm:flex-row'
          : 'sm:flex-row-reverse'
      } items-start gap-4 sm:gap-8`}
    >
      {/* Icon node */}
      <div
        className={`absolute z-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-burgundy-500 text-white shadow-lg shadow-pink-500/30 ${
          lang === 'ar' ? 'right-4 sm:right-1/2 sm:translate-x-6' : 'left-4 sm:left-1/2 sm:-translate-x-6'
        } top-0 h-12 w-12`}
      >
        <Icon size={22} />
      </div>

      {/* Card */}
      <div
        className={`w-full pt-2 ${
          isRight ? 'sm:w-1/2' : 'sm:w-1/2'
        } ${
          isRight
            ? lang === 'ar'
              ? 'sm:pr-12'
              : 'sm:pl-12'
            : lang === 'ar'
            ? 'sm:pl-12'
            : 'sm:pr-12'
        } ${
          isRight ? (lang === 'ar' ? '' : 'sm:text-left') : ''
        }`}
      >
        <div
          className={`glass-card rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-pink-500/10 ${
            chapter.isFuture ? 'border-pink-200/40' : ''
          }`}
        >
          {/* Chapter number */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400/60">
              {String(chapter.number).padStart(2, '0')}
            </span>
            {!chapter.isLocked && (
              <button
                onClick={onEdit}
                className="rounded-lg p-1.5 text-pink-400/60 transition-colors hover:bg-pink-100 hover:text-pink-600"
                title={t('edit')}
              >
                <Pencil size={14} />
              </button>
            )}
          </div>

          {/* Locked chapter */}
          {chapter.isLocked ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <Lock className="text-pink-400/50" size={32} />
              <h3 className="text-xl font-bold text-burgundy-700">
                {title}
              </h3>
              <p className="text-sm text-burgundy-500/70 font-arabic">
                {t('future_locked')}
              </p>
              <button
                onClick={onUnlock}
                className="mt-2 rounded-full bg-pink-100 px-5 py-2 text-sm font-medium text-pink-600 transition-all hover:bg-pink-200"
              >
                {t('unlock_chapter')}
              </button>
            </div>
          ) : editing ? (
            <EditChapter
              chapter={chapter}
              lang={lang}
              t={t}
              onUpdate={onUpdate}
              onDone={onEdit}
              onAddConversation={onAddConversation}
              onUpdateConversation={onUpdateConversation}
              onDeleteConversation={onDeleteConversation}
            />
          ) : (
            <div>
              <h3 className="mb-1 text-2xl font-bold text-burgundy-800">
                {title}
              </h3>
              {date && (
                <p className="mb-3 text-sm font-medium text-pink-500">
                  {date}
                </p>
              )}
              <p
                className={`text-burgundy-700/80 ${
                  lang === 'ar' ? 'font-arabic' : ''
                }`}
              >
                {desc}
              </p>
              {location && (
                <p className="mt-2 text-sm text-pink-400/70">
                  📍 {location}
                </p>
              )}
              {chapter.photo && (
                <img
                  src={chapter.photo}
                  alt={title}
                  className="mt-4 w-full rounded-xl object-cover shadow-md"
                />
              )}

              {/* Conversations */}
              {chapter.conversations && chapter.conversations.length > 0 && (
                <div className="mt-4 space-y-3">
                  {chapter.conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="rounded-xl border border-pink-200/50 bg-pink-50/50 p-4"
                    >
                      <p className="mb-1 text-sm font-bold text-pink-600">
                        {lang === 'ar' ? conv.labelAr : conv.labelEn}
                      </p>
                      {(lang === 'ar' ? conv.textAr : conv.textEn) && (
                        <p
                          className={`text-sm text-burgundy-700/80 ${
                            lang === 'ar' ? 'font-arabic' : ''
                          }`}
                        >
                          {lang === 'ar' ? conv.textAr : conv.textEn}
                        </p>
                      )}
                      {conv.photo && (
                        <img
                          src={conv.photo}
                          alt="conversation memory"
                          className="mt-3 w-full max-w-xs rounded-lg object-cover shadow-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {chapter.id === 'ch5' && <AnniversaryCountdown />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EditChapter({
  chapter,
  lang,
  t,
  onUpdate,
  onDone,
  onAddConversation,
  onUpdateConversation,
  onDeleteConversation,
}: {
  chapter: TimelineChapter;
  lang: 'ar' | 'en';
  t: (key: import('@/data/translations').TranslationKey) => string;
  onUpdate: (updates: Partial<TimelineChapter>) => void;
  onDone: () => void;
  onAddConversation: () => void;
  onUpdateConversation: (
    convId: string,
    updates: Partial<ConversationEntry>
  ) => void;
  onDeleteConversation: (convId: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-pink-600">
          {t('edit_mode')}
        </span>
        <button
          onClick={onDone}
          className="flex items-center gap-1 rounded-lg bg-pink-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-pink-600"
        >
          <Save size={14} /> {t('save')}
        </button>
      </div>

      <label className="block">
        <span className="text-xs font-medium text-burgundy-600">
          {t('date_label')}
        </span>
        <input
          type="text"
          value={lang === 'ar' ? chapter.dateAr : chapter.dateEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ dateAr: e.target.value })
              : onUpdate({ dateEn: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-burgundy-600">
          {t('title_label')}
        </span>
        <input
          type="text"
          value={lang === 'ar' ? chapter.titleAr : chapter.titleEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ titleAr: e.target.value })
              : onUpdate({ titleEn: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-burgundy-600">
          {t('description_label')}
        </span>
        <textarea
          rows={3}
          value={lang === 'ar' ? chapter.descAr : chapter.descEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ descAr: e.target.value })
              : onUpdate({ descEn: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-burgundy-600">
          {t('location_label')}
        </span>
        <input
          type="text"
          value={lang === 'ar' ? chapter.locationAr : chapter.locationEn}
          onChange={(e) =>
            lang === 'ar'
              ? onUpdate({ locationAr: e.target.value })
              : onUpdate({ locationEn: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
      </label>

      <div>
        <span className="text-xs font-medium text-burgundy-600">
          {t('photo_label')}
        </span>
        <div className="mt-1 h-32">
          <ImageUpload
            photo={chapter.photo}
            onChange={(photo) => onUpdate({ photo })}
          />
        </div>
      </div>

      {/* Conversations editing */}
      {chapter.conversations !== undefined && (
        <div className="space-y-3 border-t border-pink-200/50 pt-3">
          {chapter.conversations.map((conv) => (
            <div
              key={conv.id}
              className="rounded-xl border border-pink-200/50 bg-white/60 p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={lang === 'ar' ? conv.labelAr : conv.labelEn}
                  onChange={(e) =>
                    lang === 'ar'
                      ? onUpdateConversation(conv.id, {
                          labelAr: e.target.value,
                        })
                      : onUpdateConversation(conv.id, {
                          labelEn: e.target.value,
                        })
                  }
                  className="flex-1 rounded border border-pink-200 bg-white px-2 py-1 text-xs font-bold text-pink-600 outline-none focus:border-pink-400"
                />
                <button
                  onClick={() => onDeleteConversation(conv.id)}
                  className="mr-2 rounded p-1 text-red-400 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <textarea
                rows={2}
                placeholder={t('description_label')}
                value={lang === 'ar' ? conv.textAr : conv.textEn}
                onChange={(e) =>
                  lang === 'ar'
                    ? onUpdateConversation(conv.id, {
                        textAr: e.target.value,
                      })
                    : onUpdateConversation(conv.id, {
                        textEn: e.target.value,
                      })
                }
                className="w-full rounded border border-pink-200 bg-white px-2 py-1 text-xs outline-none focus:border-pink-400"
              />
              <div className="h-20">
                <ImageUpload
                  photo={conv.photo}
                  onChange={(photo) =>
                    onUpdateConversation(conv.id, { photo })
                  }
                />
              </div>
            </div>
          ))}
          <button
            onClick={onAddConversation}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-pink-300 py-2 text-sm text-pink-500 transition-colors hover:bg-pink-50"
          >
            <Plus size={16} /> {t('add')}
          </button>
        </div>
      )}
    </div>
  );
}

import { FIRST_ANNIVERSARY } from '@/data/defaultContent';
import { useNow } from '@/hooks/useNow';

function AnniversaryCountdown() {
  const { t, lang } = useLanguage();
  const now = useNow(1000);

  const target = new Date(FIRST_ANNIVERSARY).getTime();
  const diff = target - now.getTime();

  if (diff <= 0) {
    return (
      <div className="mt-4 rounded-xl bg-gradient-to-r from-pink-100 to-cream-100 p-4 text-center">
        <p className="text-lg font-bold text-burgundy-700">
          {t('anniversary_title')}
        </p>
        <p
          className={`mt-1 text-sm text-burgundy-600/80 ${
            lang === 'ar' ? 'font-arabic' : ''
          }`}
        >
          {t('anniversary_message')}
        </p>
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="mt-4 rounded-xl bg-gradient-to-r from-pink-50 to-cream-50 p-4">
      <p className="mb-3 text-center text-sm font-bold text-pink-600">
        {t('countdown_title')}
      </p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { value: days, label: t('counter_days') },
          { value: hours, label: t('counter_hours') },
          { value: minutes, label: t('counter_minutes') },
          { value: seconds, label: t('counter_seconds') },
        ].map((item) => (
          <div key={item.label}>
            <div className="rounded-lg bg-white/70 py-2 text-lg font-bold text-burgundy-700">
              {item.value}
            </div>
            <div className="mt-1 text-[10px] text-pink-500/70">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
