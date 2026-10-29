import React from 'react';

/**
 * Editorial Luxury System — Arte Inédito
 * Authentic physical workshop aesthetic:
 * - Pure White Cards (#FFFFFF) over Warm Cream (#F7F5F2)
 * - Layered realistic shadows (tactile depth)
 * - Hairline borders (#E8E4DF)
 * - High-contrast typography (#1A1A1A / #5C5C5C)
 * - Corporate Red Accent (#C41E3A / hover: #A81830)
 */

export const glassHeaderStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.94)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid #E8E4DF',
  boxShadow: '0 4px 20px -2px rgba(28, 25, 23, 0.04), 0 1px 3px 0 rgba(28, 25, 23, 0.02)'
};

export const glassCardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E8E4DF',
  boxShadow: '0 1px 3px 0 rgba(28, 25, 23, 0.03), 0 8px 20px -3px rgba(28, 25, 23, 0.04)'
};

export const glassPillStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E8E4DF',
  boxShadow: '0 1px 2px rgba(28, 25, 23, 0.03)'
};

export const glassPillActiveStyle: React.CSSProperties = {
  background: '#C41E3A',
  color: '#FFFFFF',
  border: '1px solid #C41E3A',
  boxShadow: '0 4px 12px rgba(196, 30, 58, 0.22)'
};

export const glassPanelStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E8E4DF',
  boxShadow: '0 4px 6px -1px rgba(28, 25, 23, 0.02), 0 16px 36px -4px rgba(28, 25, 23, 0.06)'
};
