import '@/app/ui/global.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Typography, Container, Box } from '@mui/material';
import Image from 'next/image';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const siteLive: boolean = true;

  return (
    siteLive ?
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@400;700;900&family=Montserrat:wght@600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Paw Party is a nonprofit matchmaking app that pairs people with shelter animals through a simple, dating-style experience. Coming 2026."
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        <title>Paw Party — The matchmaking app for shelter animals</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <Box sx={{ overflowX: 'hidden' }}>
            {children}
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html> :

    <html>
      <body>
        <Container>
          <Box sx={{ textAlign: 'center', padding: 1, backgroundColor: 'primary.main', rounded: '8px' }}>
            <Image src="pawparty-logo.svg" alt="Logo" width={400} height={400} />
          </Box>
          <Typography sx={{textAlign: 'center', fontSize: 24, fontFamily: 'Montserrat', fontWeight: 'bold'}} >Site coming soon!</Typography>
        </Container>
      </body>
    </html>
  );
}
