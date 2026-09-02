'use client';

import React, { useMemo } from 'react';

// Ported from the Claude Design handoff (design/src/icons.jsx).
// Original treatments — not redraws of brand art.

export function Heart({
  size = 24,
  color = '#FF5A5F',
  style,
  className,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={style} className={className} aria-hidden="true">
      <path
        d="M16 27.5c-1.1 0-9.5-5.6-12.4-10.7C1.4 12.6 3.6 7 8.5 7c2.9 0 5.4 1.7 7.5 4.6C18.1 8.7 20.6 7 23.5 7c4.9 0 7.1 5.6 4.9 9.8C25.5 21.9 17.1 27.5 16 27.5z"
        fill={color}
      />
    </svg>
  );
}

export function Paw({
  size = 24,
  color = '#377DFF',
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={style} aria-hidden="true">
      <ellipse cx="20" cy="20" rx="6" ry="8" fill={color} />
      <ellipse cx="44" cy="20" rx="6" ry="8" fill={color} />
      <ellipse cx="10" cy="34" rx="5" ry="7" fill={color} />
      <ellipse cx="54" cy="34" rx="5" ry="7" fill={color} />
      <path
        d="M32 30c-7 0-13 6-13 13 0 5 4 8 8 8 2 0 3-1 5-1s3 1 5 1c4 0 8-3 8-8 0-7-6-13-13-13z"
        fill={color}
      />
    </svg>
  );
}

// Logo wordmark using a paw glyph between letters.
export function PawPartyLogo({
  height = 40,
  primary = '#377DFF',
  accent = '#46DEE8',
}: {
  height?: number;
  primary?: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: height * 0.18,
        fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: height,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: height * 0.05 }}>
        <span style={{ color: primary }}>P</span>
        <Paw size={height * 0.7} color={primary} style={{ transform: 'translateY(6%)' }} />
        <span style={{ color: primary }}>w</span>
      </span>
      <span
        style={{
          background: `linear-gradient(90deg, ${primary} 0%, ${accent} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Party
      </span>
    </div>
  );
}

// Large hero wordmark — inherits font-size from parent (responsive via parent sx).
export function PawPartyLogoLarge({
  primary = '#377DFF',
  accent = '#46DEE8',
}: {
  primary?: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.18em',
        fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.04em' }}>
        <span style={{ color: primary }}>P</span>
        <svg viewBox="0 0 64 64" width="0.72em" height="0.72em" style={{ transform: 'translateY(6%)' }} aria-hidden="true">
          <ellipse cx="20" cy="20" rx="6" ry="8" fill={primary} />
          <ellipse cx="44" cy="20" rx="6" ry="8" fill={primary} />
          <ellipse cx="10" cy="34" rx="5" ry="7" fill={primary} />
          <ellipse cx="54" cy="34" rx="5" ry="7" fill={primary} />
          <path d="M32 30c-7 0-13 6-13 13 0 5 4 8 8 8 2 0 3-1 5-1s3 1 5 1c4 0 8-3 8-8 0-7-6-13-13-13z" fill={primary} />
        </svg>
        <span style={{ color: primary }}>w</span>
      </span>
      <span
        style={{
          background: `linear-gradient(90deg, ${primary} 0%, ${accent} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Party
      </span>
    </div>
  );
}

// Random confetti dots/sticks — generated from a seed so it's stable.
function seedRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function Confetti({
  width = 600,
  height = 320,
  count = 28,
  seed = 7,
  palette,
}: {
  width?: number;
  height?: number;
  count?: number;
  seed?: number;
  palette?: string[];
}) {
  const colors = palette || ['#FF5A5F', '#46DEE8', '#FFC940', '#377DFF', '#5CE3B1'];
  const pieces = useMemo(() => {
    const r = seedRand(seed);
    return Array.from({ length: count }, (_, i) => {
      const isDot = r() > 0.5;
      return {
        id: i,
        x: r() * width,
        y: r() * height,
        rot: r() * 360,
        len: 8 + r() * 16,
        size: 4 + r() * 5,
        color: colors[Math.floor(r() * colors.length)],
        isDot,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, count, seed]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {pieces.map((p) =>
        p.isDot ? (
          <circle key={p.id} cx={p.x} cy={p.y} r={p.size / 1.6} fill={p.color} opacity="0.85" />
        ) : (
          <rect
            key={p.id}
            x={p.x}
            y={p.y}
            width={p.len}
            height={3}
            rx="1.5"
            fill={p.color}
            transform={`rotate(${p.rot} ${p.x + p.len / 2} ${p.y + 1.5})`}
            opacity="0.9"
          />
        )
      )}
    </svg>
  );
}
