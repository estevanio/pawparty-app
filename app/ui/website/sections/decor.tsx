'use client';

import React, { useMemo } from 'react';
import { Heart } from './icons';

// A round image wrapped with an optional colored ring.
// (Ported from handoff decor.jsx — the prototype <image-slot> is replaced
// with a real <img> driven by `src`.)
export function CircleImageSlot({
  src,
  alt,
  size = 280,
  ring,
  ringWidth = 0,
  style = {},
}: {
  src: string;
  alt: string;
  size?: number;
  ring?: string;
  ringWidth?: number;
  style?: React.CSSProperties;
}) {
  const inner = size - ringWidth * 2;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: ring || 'transparent',
        padding: ringWidth,
        display: 'inline-block',
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: `${inner}px`,
          height: `${inner}px`,
          display: 'block',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

// Floating cluster of hearts — used decoratively in the mission/vision area.
export function HeartCluster({
  count = 7,
  color = '#FF5A5F',
  sizeRange = [22, 56],
  seed = 11,
  style = {},
}: {
  count?: number;
  color?: string;
  sizeRange?: [number, number];
  seed?: number;
  style?: React.CSSProperties;
}) {
  const rand = (s: number) => {
    let v = s;
    return () => {
      v = (v * 9301 + 49297) % 233280;
      return v / 233280;
    };
  };
  const r = useMemo(() => {
    const rng = rand(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: rng() * 100,
      left: rng() * 100,
      size: sizeRange[0] + rng() * (sizeRange[1] - sizeRange[0]),
      rot: -20 + rng() * 40,
      opacity: 0.6 + rng() * 0.4,
      delay: rng() * 4,
      duration: 3 + rng() * 2.5,
      drift: 6 + rng() * 14,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, seed, sizeRange[0], sizeRange[1]]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }} aria-hidden="true">
      <style>{`
        @keyframes heart-bob {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(var(--hr)) scale(1); }
          50%      { transform: translate(-50%, -50%) translateY(calc(var(--hd) * -1px)) rotate(calc(var(--hr) + 6deg)) scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .heart-bobber { animation: none !important; }
        }
      `}</style>
      {r.map((h) => (
        <div
          key={h.id}
          className="heart-bobber"
          style={
            {
              position: 'absolute',
              top: `${h.top}%`,
              left: `${h.left}%`,
              opacity: h.opacity,
              '--hr': `${h.rot}deg`,
              '--hd': h.drift,
              transform: `translate(-50%, -50%) rotate(${h.rot}deg)`,
              animation: `heart-bob ${h.duration}s ease-in-out ${h.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          <Heart size={h.size} color={color} />
        </div>
      ))}
    </div>
  );
}

// Soft colored blob backdrop behind a circular image.
export function ColoredDisc({
  size = 320,
  color = '#46DEE8',
  children,
  style = {},
}: {
  size?: number;
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
