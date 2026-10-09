import { useMemo } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

function generateHearts(count: number): FloatingHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 22,
    duration: 12 + Math.random() * 18,
    delay: Math.random() * 15,
    drift: (Math.random() - 0.5) * 120,
    opacity: 0.15 + Math.random() * 0.35,
  }));
}

function generateSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 5,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
}

export function AnimatedBackground() {
  const hearts = useMemo(() => generateHearts(20), []);
  const sparkles = useMemo(() => generateSparkles(30), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-pink-100 to-cream-100" />

      {/* Soft radial glows */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(255,169,194,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,200,220,0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,240,208,0.2) 0%, transparent 60%)',
        }}
      />

      {/* Floating hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-40px] animate-float-up"
          style={
            {
              left: `${h.left}%`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              '--drift': `${h.drift}px`,
              opacity: h.opacity,
            } as React.CSSProperties
          }
        >
          <Heart
            fill="#ff6fa0"
            color="#f5478a"
            style={{ width: h.size, height: h.size }}
          />
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill="#ffc9dd"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
