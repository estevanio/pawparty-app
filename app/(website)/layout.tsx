'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import websiteTheme from '@/app/ui/website/theme';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={websiteTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
