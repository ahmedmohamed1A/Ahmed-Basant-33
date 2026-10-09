import { useEffect, useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { scrollToSection } from '@/utils/helpers';

export function Navbar() {
  const { t, toggleLang, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t('nav_home') },
    { id: 'story', label: t('nav_story') },
    { id: 'gallery', label: t('nav_memories') },
    { id: 'letter', label: t('nav_letter') },
    { id: 'future', label: t('nav_future') },
  ];

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-card shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="flex items-center gap-2 text-xl font-script text-gradient-rose transition-transform hover:scale-105"
        >
          <Heart size={20} className="text-pink-500" fill="#f5478a" />
          <span className="hidden sm:inline">{t('hero_title')}</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`relative font-arabic text-sm font-medium transition-colors hover:text-pink-600 ${
                scrolled ? 'text-burgundy-800' : 'text-burgundy-700'
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-pink-500 transition-all duration-300 hover:w-full" />
            </button>
          ))}

          {/* Language switcher */}
          <button
            onClick={toggleLang}
            className="rounded-full border border-pink-300/60 bg-pink-50/80 px-4 py-1.5 text-sm font-medium text-burgundy-700 transition-all hover:bg-pink-100 hover:shadow-md"
          >
            {t('lang_label')}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLang}
            className="rounded-full border border-pink-300/60 bg-pink-50/80 px-3 py-1 text-xs font-medium text-burgundy-700"
          >
            {lang === 'ar' ? 'EN 🇬🇧' : 'مصري 🇪🇬'}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`p-2 transition-colors ${
              scrolled ? 'text-burgundy-800' : 'text-burgundy-700'
            }`}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="glass-card mx-4 mt-2 rounded-2xl p-4 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="block w-full rounded-xl px-4 py-3 text-start font-arabic text-base font-medium text-burgundy-800 transition-colors hover:bg-pink-100/60"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
