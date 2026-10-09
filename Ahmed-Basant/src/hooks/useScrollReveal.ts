import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal:not(.is-visible)');
      els.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
