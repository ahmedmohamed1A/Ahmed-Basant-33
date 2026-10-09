import { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { defaultContent, type SiteContent } from '@/data/defaultContent';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { StoryTimeline } from '@/components/sections/StoryTimeline';
import { LoveCounter } from '@/components/sections/LoveCounter';
import { PhotoGallery } from '@/components/sections/PhotoGallery';
import { SpecialMoments } from '@/components/sections/SpecialMoments';
import { LoveLetter } from '@/components/sections/LoveLetter';
import { DreamyNight } from '@/components/sections/DreamyNight';
import { MusicPlayer } from '@/components/sections/MusicPlayer';
import { SecretMessage } from '@/components/sections/SecretMessage';
import { OurFuture } from '@/components/sections/OurFuture';
import { ImportantDates } from '@/components/sections/ImportantDates';
import { FinalSection } from '@/components/sections/FinalSection';

function AppContent() {
  useScrollReveal();
  const { t, lang } = useLanguage();
  const [content, setContent] = useLocalStorage<SiteContent>(
    'ab_site_content',
    defaultContent
  );

  return (
    <div
      className="relative min-h-screen"
      style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
    >
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection />
          <IntroSection content={content} />
          <StoryTimeline content={content} setContent={setContent} />
          <LoveCounter />
          <PhotoGallery content={content} setContent={setContent} />
          <SpecialMoments content={content} setContent={setContent} />
          <LoveLetter content={content} setContent={setContent} />
          <DreamyNight content={content} />
          <MusicPlayer content={content} setContent={setContent} />
          <ImportantDates content={content} setContent={setContent} />
          <OurFuture content={content} />
          <FinalSection />
        </main>

        {/* Storage notice */}
        <div className="relative z-10 px-4 py-6 text-center">
          <p
            className={`text-xs text-burgundy-500/50 ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {t('storage_local_only')}
          </p>
        </div>
      </div>

      {/* Secret message floating button + modal */}
      <SecretMessage content={content} setContent={setContent} />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <LanguageProvider>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
