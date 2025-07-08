
import type { CSSProperties } from 'react';

export const webContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#222',
  alignItems: 'center',
  justifyContent: 'center',
};

export const webProgressRowStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: 'calc(100vw - 32px)',
  gap: 4,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 16,
  left: 0,
  zIndex: 10,
  background: '#222',
  padding: '8px 16px 0 16px',
};

export const webStoryAreaStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 32,
  marginBottom: 32,
  marginLeft: 24,
  marginRight: 24,
};

export const webImageStyle: CSSProperties = {
  width: 220,
  height: 220,
  borderRadius: 16,
  boxShadow: '0 0 32px 0 #fff4',
  objectFit: 'cover',
  marginBottom: 16,
  transition: 'opacity 0.3s',
};

export const webLoaderStyle: CSSProperties = {
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  minHeight: 40,
  marginTop: 16,
};

export const webInfoBlock: CSSProperties = {
  marginTop: 16,
  marginBottom: 8,
};

export const webBadgeRow: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  marginTop: 8,
};

export const webBadge: CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.15)',
  borderRadius: 12,
  padding: '4px 12px',
  color: '#fff',
  fontWeight: 600,
  fontSize: 14,
};

export const webAbilityBadge: CSSProperties = {
  backgroundColor: '#fff2',
  borderRadius: 12,
  padding: '4px 12px',
  color: '#fff',
  fontWeight: 600,
  fontSize: 14,
};
