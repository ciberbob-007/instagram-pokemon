
import type { CSSProperties } from 'react';

export const webProgressBarContainer: CSSProperties = {
  width: '100%',
  height: 6,
  background: 'rgba(255,255,255,0.3)',
  borderRadius: 3,
  margin: '0 3px',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
};

export const webProgressBarFill = (progress: number): CSSProperties => ({
  height: 6,
  borderRadius: 3,
  background: '#fff',
  width: `${progress * 100}%`,
  transition: 'width 0.1s linear',
});
