'use client';

import { createTheme } from '@mui/material/styles';

// Classic palette tokens from the Claude Design handoff (design/src/app.jsx).
// Imported directly by the website sections instead of threading a `palette` prop.
export const palette = {
  primary: '#377DFF',
  primaryDark: '#1B3C87',
  accent: '#46DEE8',
  teal: '#00B0B9',
  coral: '#FF5A5F',
  gold: '#F4C20D',
};

const websiteTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: palette.primary, dark: palette.primaryDark },
    secondary: { main: palette.teal },
    background: { default: '#ffffff' },
    text: { primary: '#1E2022', secondary: '#475569' },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
  shape: { borderRadius: 12 },
});

export default websiteTheme;
