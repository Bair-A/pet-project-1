import { ReactNode } from 'react';

import { AppThemeProvider as ThemeProvider } from './AppThemeProvider';
import { QueryProvider } from './QueryProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <QueryProvider>{children}</QueryProvider>
  </ThemeProvider>
);
