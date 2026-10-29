import React from 'react';

/**
 * Liquid Glass Material System — Light Cream Luxury Edition
 * Optimized for Family-friendly / Premium claro
 * Palette:
 * - Page Background: #F7F5F2
 * - Surface / Card: #FFFFFF
 * - Border: #E8E4DF
 * - Main Text: #1A1A1A
 * - Secondary Text: #5C5C5C
 * - Accent: #C41E3A (hover: #A81830)
 */

export const glassHeaderStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.90)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid #E8E4DF',
  boxShadow: '0 4px 20px -2px rgba(26, 26, 26, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)'
};

export const glassCardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid #E8E4DF',
  boxShadow: '0 2px 10px -2px rgba(26, 26, 26, 0.04), 0 1px 3px 0 rgba(26, 26, 26, 0.02)'
};

export const glassPillStyle: React.CSSProperties = {
  background: '#FFFFFF',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid #E8E4DF',
  boxShadow: '0 1px 3px rgba(26, 26, 26, 0.04)'
};

export const glassPillActiveStyle: React.CSSProperties = {
  background: '#C41E3A',
  color: '#FFFFFF',
  border: '1px solid #C41E3A',
  boxShadow: '0 2px 10px rgba(196, 30, 58, 0.25)'
};

export const glassPanelStyle: React.CSSProperties = {
  background: '#FFFFFF',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid #E8E4DF',
  boxShadow: '0 10px 30px -4px rgba(26, 26, 26, 0.06)'
};
