import React from 'react';

/**
 * Liquid Glass Real 2026 Material System
 * Exact properties required for direct DevTools inspection & Apple VisionOS glassmorphism
 */

export const glassHeaderStyle: React.CSSProperties = {
  background: 'rgba(14, 14, 18, 0.55)',
  backdropFilter: 'blur(24px) saturate(170%)',
  WebkitBackdropFilter: 'blur(24px) saturate(170%)',
  border: '1px solid rgba(255, 255, 255, 0.09)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)'
};

export const glassCardStyle: React.CSSProperties = {
  background: 'rgba(18, 18, 22, 0.50)',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)'
};

export const glassPillStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
};

export const glassPillActiveStyle: React.CSSProperties = {
  background: 'rgba(196, 30, 58, 0.22)',
  backdropFilter: 'blur(16px) saturate(170%)',
  WebkitBackdropFilter: 'blur(16px) saturate(170%)',
  border: '1px solid rgba(229, 57, 53, 0.55)',
  boxShadow: '0 4px 20px -2px rgba(196, 30, 58, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.28)'
};

export const glassPanelStyle: React.CSSProperties = {
  background: 'rgba(18, 18, 22, 0.50)',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)'
};
