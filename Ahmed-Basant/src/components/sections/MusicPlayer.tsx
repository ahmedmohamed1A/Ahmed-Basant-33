import { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Upload,
  Pencil,
  Save,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContent } from '@/data/defaultContent';
import { fileToDataUrl } from '@/utils/helpers';

interface MusicPlayerProps {
  content: SiteContent;
  setContent: (
    updater: (prev: SiteContent) => SiteContent
  ) => void;
}

export function MusicPlayer({ content, setContent }: MusicPlayerProps) {
  const { t, lang } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, [content.songFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !content.songFile) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setCurrentTime(val);
  };

  const handleSongUpload = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setContent((prev) => ({ ...prev, songFile: dataUrl }));
      setIsPlaying(false);
    } catch {
      /* ignore */
    }
  };

  const handleCoverUpload = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setContent((prev) => ({ ...prev, songCover: dataUrl }));
    } catch {
      /* ignore */
    }
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="reveal mb-8 text-center">
          <h2 className="font-script text-4xl sm:text-5xl text-gradient-rose">
            {t('song_title')}
          </h2>
          <p className="mt-2 text-sm text-burgundy-600/70 font-arabic">
            {t('song_subtitle')}
          </p>
        </div>

        <div className="reveal glass-card rounded-3xl p-6 sm:p-8">
          <audio ref={audioRef} src={content.songFile ?? undefined} preload="metadata" />

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Cover art */}
            <div className="relative group">
              <div className="h-32 w-32 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-200 to-burgundy-300 shadow-lg sm:h-40 sm:w-40">
                {content.songCover ? (
                  <img
                    src={content.songCover}
                    alt="cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Music
                      className={`text-pink-500/40 ${
                        isPlaying ? 'animate-spin' : ''
                      }`}
                      size={48}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => coverRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Upload size={20} className="text-white" />
              </button>
              <input
                ref={coverRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleCoverUpload(e.target.files?.[0])}
              />
            </div>

            {/* Player controls */}
            <div className="flex flex-1 flex-col gap-4">
              {editing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder={t('title_label')}
                    value={content.songTitle}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        songTitle: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
                  />
                  <input
                    type="text"
                    placeholder={t('artist_label')}
                    value={content.songArtist}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        songArtist: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink-400"
                  />
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1 rounded-lg bg-pink-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    <Save size={14} /> {t('save')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-burgundy-800">
                      {content.songTitle ||
                        (lang === 'ar' ? 'أغنيتنا' : 'Our Song')}
                    </h3>
                    <p className="text-sm text-pink-500/70">
                      {content.songArtist ||
                        (lang === 'ar' ? 'الفنان' : 'Artist')}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="rounded-lg p-2 text-pink-400/60 transition-colors hover:bg-pink-100 hover:text-pink-600"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              )}

              {/* Progress bar */}
              <div>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={seek}
                  disabled={!content.songFile}
                  className="w-full accent-pink-500 disabled:opacity-40"
                />
                <div className="mt-1 flex justify-between text-xs text-burgundy-500/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={togglePlay}
                  disabled={!content.songFile}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-burgundy-600 text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
                >
                  {isPlaying ? (
                    <Pause size={24} fill="white" />
                  ) : (
                    <Play size={24} fill="white" />
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="text-pink-500 transition-colors hover:text-pink-600"
                  >
                    {muted || volume === 0 ? (
                      <VolumeX size={20} />
                    ) : (
                      <Volume2 size={20} />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      setMuted(false);
                    }}
                    className="w-20 accent-pink-500"
                  />
                </div>
              </div>

              {/* Upload button */}
              {!content.songFile && (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-pink-300/60 bg-pink-50/40 py-3 text-sm text-pink-500 transition-all hover:border-pink-400 hover:bg-pink-100/40"
                >
                  <Upload size={18} /> {t('song_upload')}
                </button>
              )}

              {content.songFile && (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="text-center text-xs text-pink-400/60 underline transition-colors hover:text-pink-500"
                >
                  {t('song_upload')}
                </button>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => handleSongUpload(e.target.files?.[0])}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
