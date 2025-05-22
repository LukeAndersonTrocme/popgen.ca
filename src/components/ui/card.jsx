'use client';

import * as React from 'react';

/**
 * A simple Card wrapper.
 */
export function Card({ className = '', ...props }) {
  return (
    <div
      className={`rounded-lg border bg-white dark:bg-slate-800 shadow-sm ${className}`}
      {...props}
    />
  );
}

/**
 * CardContent area.
 */
export function CardContent({ className = '', ...props }) {
  return (
    <div className={`p-6 text-slate-900 dark:text-slate-50 ${className}`} {...props} />
  );
}
