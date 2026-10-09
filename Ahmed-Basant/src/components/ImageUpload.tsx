import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fileToDataUrl } from '@/utils/helpers';

interface ImageUploadProps {
  photo: string | null;
  onChange: (dataUrl: string | null) => void;
  className?: string;
  rounded?: boolean;
  label?: string;
}

export function ImageUpload({
  photo,
  onChange,
  className = '',
  rounded = false,
}: ImageUploadProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {photo ? (
        <>
          <img
            src={photo}
            alt="memory"
            className={`w-full h-full object-cover ${
              rounded ? 'rounded-full' : 'rounded-xl'
            }`}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 ${
              rounded ? 'rounded-full' : 'rounded-xl'
            }`}
          >
            <button
              onClick={() => inputRef.current?.click()}
              className="rounded-full bg-white/90 p-2 text-burgundy-700 transition-transform hover:scale-110"
              title={t('upload_photo')}
            >
              <Upload size={18} />
            </button>
            <button
              onClick={() => onChange(null)}
              className="rounded-full bg-white/90 p-2 text-burgundy-700 transition-transform hover:scale-110"
              title={t('delete')}
            >
              <X size={18} />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className={`flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-pink-300/60 bg-pink-50/40 ${
            rounded ? 'rounded-full' : 'rounded-xl'
          } transition-all hover:border-pink-400 hover:bg-pink-100/40`}
        >
          <div className="flex flex-col items-center gap-1 text-pink-400/70">
            <Upload size={24} />
            <span className="text-xs font-medium text-pink-500/70">
              {t('upload_photo')}
            </span>
          </div>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
