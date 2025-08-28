'use client';

import { ReactNode } from 'react';

import { ThemeProvider } from 'next-themes';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
