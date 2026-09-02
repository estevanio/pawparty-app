'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Link as MuiLink,
} from '@mui/material';
import { palette } from '../theme';
import { PawPartyLogo, PawPartyLogoLarge, Confetti } from './icons';
import { CircleImageSlot, HeartCluster, ColoredDisc } from './decor';

const IMG = '/img/website';

// ======================================================================
// NAV BAR
// ======================================================================
export function NavBar() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'About Us', href: '#about' },
    { label: 'Mission', href: '#mission' },
    { label: 'The App', href: '#app' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(30,32,34,0.06)',
        color: '#1E2022',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 }, gap: 2 }}>
          <Box component="a" href="#hero" sx={{ display: 'flex', textDecoration: 'none' }}>
            <PawPartyLogo height={mobile ? 30 : 36} primary={palette.primary} accent={palette.accent} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {!mobile && (
            <Stack direction="row" spacing={4} alignItems="center">
              {links.map((l) => (
                <MuiLink
                  key={l.href}
                  href={l.href}
                  underline="none"
                  sx={{
                    color: '#1E2022',
                    fontWeight: 500,
                    fontSize: 15,
                    '&:hover': { color: palette.primary },
                  }}
                >
                  {l.label}
                </MuiLink>
              ))}
              <Button
                variant="contained"
                disableElevation
                href="#sponsor"
                sx={{
                  bgcolor: palette.gold,
                  color: '#1E2022',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 999,
                  px: 3,
                  py: 1.1,
                  '&:hover': { bgcolor: '#e8b21f' },
                }}
              >
                Become a Sponsor
              </Button>
            </Stack>
          )}
          {mobile && (
            <IconButton onClick={() => setOpen(true)} edge="end" sx={{ color: '#1E2022' }}>
              <Box sx={{ width: 24, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Box sx={{ height: 2, bgcolor: '#1E2022', borderRadius: 1 }} />
                <Box sx={{ height: 2, bgcolor: '#1E2022', borderRadius: 1 }} />
                <Box sx={{ height: 2, bgcolor: '#1E2022', borderRadius: 1 }} />
              </Box>
            </IconButton>
          )}
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <List>
            {links.map((l) => (
              <ListItem key={l.href} disablePadding>
                <ListItemButton component="a" href={l.href} onClick={() => setOpen(false)}>
                  <ListItemText primary={l.label} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                href="#sponsor"
                onClick={() => setOpen(false)}
                sx={{
                  bgcolor: palette.gold,
                  color: '#1E2022',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 999,
                }}
              >
                Become a Sponsor
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

// ======================================================================
// HERO
// ======================================================================
export function Hero() {
  return (
    <Box id="hero" sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Stack alignItems="center" spacing={{ xs: 4, md: 6 }}>
          {/* Wordmark */}
          <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ display: 'inline-flex', fontSize: { xs: 56, sm: 84, md: 120, lg: 150 } }}>
              <PawPartyLogoLarge primary={palette.primary} accent={palette.accent} />
            </Box>
          </Box>

          {/* Banner */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              overflow: 'visible',
              height: { xs: 360, md: 460 },
            }}
          >
            {/* Rounded blue panel — clipped layer */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: { xs: 4, md: 8 },
                background: `linear-gradient(110deg, ${palette.primary} 0%, ${palette.primaryDark} 100%)`,
                overflow: 'hidden',
              }}
            >
              <Confetti width={1600} height={460} count={48} seed={3} />
              <HeartCluster count={5} color={palette.coral} sizeRange={[36, 90]} seed={2} style={{ inset: 0 }} />
            </Box>

            {/* Text content (right side) */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Stack
                  spacing={2}
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                    color: '#fff',
                    px: { xs: 2, md: 0 },
                    width: { xs: '100%', md: '52%' },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 600,
                      fontSize: { xs: 28, sm: 36, md: 48 },
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    The only matchmaking app where you&rsquo;re sure to find love!
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 600,
                      fontSize: { xs: 26, sm: 32, md: 40 },
                      color: palette.gold,
                    }}
                  >
                    Coming 2026!
                  </Typography>
                </Stack>
              </Box>
            </Container>

            {/* Dog — positioned to overflow top + bottom of panel */}
            <Box
              sx={{
                position: 'absolute',
                left: { xs: '50%', md: '4%' },
                transform: { xs: 'translateX(-50%)', md: 'none' },
                bottom: { xs: 20, md: 30 },
                height: { xs: 240, md: 480 },
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              <img
                src={`${IMG}/hero-dog.png`}
                alt="Dog wearing a party hat"
                style={{ height: '100%', width: 'auto', display: 'block' }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

// ======================================================================
// ABOUT
// ======================================================================
export function About() {
  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="overline" sx={{ color: palette.teal, fontWeight: 700, letterSpacing: '0.18em', fontSize: 14 }}>
              ABOUT US
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 28, md: 36 },
                lineHeight: 1.25,
                color: '#1E2022',
                mt: 1.5,
                mb: 2.5,
                textWrap: 'pretty',
              }}
            >
              Paw Party is a nonprofit app platform that pairs people and pets through a simple, online dating-style matching experience.
            </Typography>
            <Typography sx={{ fontSize: { xs: 17, md: 19 }, lineHeight: 1.6, color: '#475569', maxWidth: 620 }}>
              We partner with shelters, volunteers, and communities to help more animals find loving homes through visibility, connection, and support.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 420,
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={`${IMG}/about-app.png`}
                alt="Hand holding phone showing the Paw Party matching screen"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ======================================================================
// MISSION + VISION
// ======================================================================
export function MissionVision() {
  return (
    <Box id="mission" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: 4, md: 8 },
            background: '#F7FAFF',
            px: { xs: 3, md: 8 },
            py: { xs: 6, md: 10 },
            overflow: 'hidden',
          }}
        >
          <Confetti width={1600} height={800} count={40} seed={9} />
          {/* Mission */}
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={`${IMG}/mission.png`}
                  alt="Two friends taking a selfie with their dog"
                  sx={{ width: '100%', maxWidth: 340, height: 'auto', display: 'block' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 28, md: 36 }, color: '#1E2022', mb: 2 }}>
                Mission
              </Typography>
              <Typography sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.55, color: '#1E2022' }}>
                Our mission is to <Box component="span" sx={{ fontWeight: 700 }}>simplify the adoption journey</Box> by creating a <Box component="span" sx={{ fontWeight: 700 }}>vibrant, user-friendly app</Box> that directly connects animal lovers with shelter animals in need, <Box component="span" sx={{ fontWeight: 700 }}>making adoption easier and more engaging</Box> for all involved.
              </Typography>
            </Grid>
          </Grid>

          {/* Hearts divider */}
          <Box sx={{ position: 'relative', height: { xs: 80, md: 120 }, my: { xs: 2, md: 4 } }}>
            <HeartCluster count={9} color={palette.coral} sizeRange={[22, 56]} seed={4} />
          </Box>

          {/* Vision */}
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" sx={{ position: 'relative', zIndex: 2 }} direction={{ xs: 'column-reverse', md: 'row' }}>
            <Grid item xs={12} md={7}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 28, md: 36 }, color: '#1E2022', mb: 2 }}>
                Vision
              </Typography>
              <Typography sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.55, color: '#1E2022' }}>
                Our vision is to <Box component="span" sx={{ fontWeight: 700 }}>deepen the profound bond between humans and animals</Box>, and for every paw to find a loving home for life.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* NOTE: no dedicated vision portrait in the handoff — using man-with-dog.png as a stand-in. Swap when final asset is ready. */}
                <CircleImageSlot
                  src={`${IMG}/man-with-dog.png`}
                  alt="A person with their dog"
                  size={320}
                  ring={palette.coral}
                  ringWidth={10}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

// ======================================================================
// THE APP — 3 steps
// ======================================================================
export function TheApp() {
  const steps = [
    {
      id: 'app-step-1',
      img: `${IMG}/find-your-match.png`,
      title: 'Explore paws',
      body: 'Swipe through pet profiles and save your favorites',
      alt: 'Phone showing the pet feed',
    },
    {
      id: 'app-step-2',
      img: `${IMG}/swipe-graphic.png`,
      title: 'Find your match',
      body: 'Match with a pet that steals your heart (and maybe your slippers)',
      alt: 'Phone showing the match screen',
    },
    {
      id: 'app-step-3',
      img: `${IMG}/make-it-official.png`,
      title: 'Make it official',
      body: 'Adopt by connecting directly to the pet’s shelter or agency',
      alt: 'Adopter with their new pet',
    },
  ];

  return (
    <Box id="app" sx={{ py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
      <Confetti width={1800} height={900} count={50} seed={6} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack alignItems="center" spacing={1.5} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 600,
              fontSize: { xs: 44, md: 64 },
              color: palette.primaryDark,
              lineHeight: 1,
            }}
          >
            The app
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 500,
              fontSize: { xs: 22, md: 32 },
              color: palette.teal,
            }}
          >
            Swipe, match, adopt
          </Typography>
          <Typography sx={{ fontSize: { xs: 17, md: 20 }, color: '#1E2022', maxWidth: 720, mt: 2, lineHeight: 1.55 }}>
            Just like a dating app but dedicated to finding pets loving homes, we pair adopters with animals who fit their lifestyle through a simple, familiar matching experience.
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 5, md: 4 }} justifyContent="center" alignItems="flex-end">
          {steps.map((s, i) => (
            <Grid item xs={12} sm={6} md={4} key={s.id}>
              <Stack alignItems="center" spacing={2.5} sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', width: { xs: 320, md: 360 }, height: { xs: 320, md: 360 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={s.img}
                    alt={s.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: 'transparent' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: 8,
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: '#fff',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 600,
                      color: palette.primaryDark,
                    }}
                  >
                    {i + 1}
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: 24, md: 28 }, color: '#1E2022' }}>
                  {s.title}
                </Typography>
                <Typography sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.55, color: '#1E2022', maxWidth: 280 }}>
                  {s.body}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ======================================================================
// WE MAKE MATCHING A PARTY!
// ======================================================================
export function MatchingAParty() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2} sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 36, md: 56 },
              color: palette.primaryDark,
              lineHeight: 1.1,
              maxWidth: 700,
            }}
          >
            We make matching a party!
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 500,
              fontSize: { xs: 18, md: 22 },
              color: palette.teal,
            }}
          >
            &rsquo;Cuz every match is worth celebrating!
          </Typography>
        </Stack>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 720,
            mx: 'auto',
            mt: { xs: 6, md: 10 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {/* Gradient panel sits behind; image overflows it */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: { xs: 4, md: 8 },
              background: `linear-gradient(140deg, ${palette.primary} 0%, ${palette.primaryDark} 100%)`,
              overflow: 'hidden',
            }}
          >
            <Confetti width={720} height={400} count={42} seed={5} />
          </Box>
          {/* Overflowing image */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              py: { xs: 3, md: 4 },
              minHeight: { xs: 280, md: 380 },
            }}
          >
            <img
              src={`${IMG}/pet-party.png`}
              alt="Friends celebrating with their pets"
              style={{
                width: '90%',
                height: 'auto',
                aspectRatio: '16 / 11',
                objectFit: 'contain',
                display: 'block',
                marginTop: '-12%',
                marginBottom: '-12%',
                background: 'transparent',
              }}
            />
          </Box>
        </Box>

        {/* Familiar, and more fun — text-only, per design */}
        <Box sx={{ mt: { xs: 6, md: 10 }, maxWidth: 720 }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 24, md: 32 }, color: '#1E2022', mb: 2 }}>
            Familiar, and more fun!
          </Typography>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: { xs: 17, md: 19 }, lineHeight: 1.6, color: '#1E2022' }}>
              With Paw Party, discovering adoptable pets feels joyful, easy, and as familiar as the dating apps many of us already use.
            </Typography>
            <Typography sx={{ fontSize: { xs: 17, md: 19 }, lineHeight: 1.6, color: palette.teal, fontWeight: 600 }}>
              Unlike &ldquo;the apps,&rdquo; every swipe on Paw Party can lead to match, and every match with an animal feels like a win!
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ======================================================================
// LASTING + LOOKING FOR LOVE
// ======================================================================
export function LastingAndLooking() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        {/* Built for lasting */}
        <Box
          sx={{
            borderRadius: { xs: 4, md: 8 },
            background: '#F7FAFF',
            px: { xs: 3, md: 8 },
            py: { xs: 6, md: 8 },
            mb: { xs: 6, md: 10 },
          }}
        >
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={`${IMG}/lasting.png`}
                  alt="Girl and corgi wearing party hats"
                  sx={{ width: '100%', maxWidth: 340, height: 'auto', display: 'block' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 28, md: 36 }, color: '#1E2022', mb: 2 }}>
                Built for lasting connection
              </Typography>
              <Stack spacing={2}>
                <Typography sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.55, color: '#1E2022' }}>
                  Lasting matches happen when the right pet meets the right person at the right moment.
                </Typography>
                <Typography sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.55, color: '#1E2022' }}>
                  It&rsquo;s why we match for location, lifestyle, and energy so you can find the kind of love that lasts.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Looking for love */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid item xs={12} md={7}>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: 28, md: 36 }, color: '#1E2022', mb: 2 }}>
              They&rsquo;re looking for love, too
            </Typography>
            <Stack spacing={2}>
              <Typography sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.55, color: '#1E2022' }}>
                Many pets are still waiting for their people, and we&rsquo;re ready to help them find each other.
              </Typography>
              <Typography sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.55, color: '#1E2022' }}>
                Let&rsquo;s make more happy matches happen.
              </Typography>
              <Typography sx={{ fontSize: { xs: 18, md: 22 }, lineHeight: 1.55, color: palette.teal, fontWeight: 700 }}>
                Paw Party app coming 2026!
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <ColoredDisc size={300} color="#DCEEFF">
                <CircleImageSlot src={`${IMG}/looking-for-love.png`} alt="Pet looking at the camera" size={240} />
              </ColoredDisc>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ======================================================================
// PAW PARTY PEOPLE
// ======================================================================
const TEAM = [
  { name: 'Clara Bertoletti', role: 'Junior Designer', img: `${IMG}/bio-card-1.png` },
  { name: 'Clara Bertoletti', role: 'Junior Designer', img: `${IMG}/bio-card-2.png` },
  { name: 'Clara Bertoletti', role: 'Art Director', img: `${IMG}/bio-card-3.png` },
  { name: 'Clara Bertoletti', role: 'Junior Designer', img: `${IMG}/bio-card-1.png` },
  { name: 'Clara Bertoletti', role: 'Junior Designer', img: `${IMG}/bio-card-2.png` },
  { name: 'Clara Bertoletti', role: 'Art Director', img: `${IMG}/bio-card-3.png` },
];

export function PawPartyPeople() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAFBFD' }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={1.5} sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 36, md: 56 },
              color: palette.primaryDark,
              lineHeight: 1.1,
            }}
          >
            The Paw Party people
          </Typography>
          <Typography sx={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: { xs: 18, md: 22 }, color: palette.teal }}>
            We&rsquo;re a pet-obsessed, volunteer-run nonprofit
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {TEAM.map((m, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid rgba(30,32,34,0.06)',
                  boxShadow: '0px 12px 24px rgba(140,152,164,0.08)',
                  transition: 'transform 200ms, box-shadow 200ms',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 18px 32px rgba(140,152,164,0.16)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2.5 }}>
                    <Box
                      component="img"
                      src={m.img}
                      alt={`${m.name}, ${m.role}`}
                      sx={{ width: 120, height: 120, display: 'block', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#1E2022' }}>{m.name}</Typography>
                  <Typography sx={{ fontSize: 14, color: '#677788', mb: 1.5 }}>{m.role}</Typography>
                  <Typography sx={{ fontSize: 14, color: '#677788', lineHeight: 1.55 }}>
                    I am an ambitious workaholic, but apart from that, pretty simple person.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ======================================================================
// JOIN THE MOVEMENT (sponsor)
// ======================================================================
export function JoinTheMovement() {
  return (
    <Box id="sponsor" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: 4, md: 8 },
            background: `linear-gradient(140deg, #FFFFFF 0%, #F7FAFF 100%)`,
            border: '1px solid rgba(30,32,34,0.06)',
            px: { xs: 4, md: 10 },
            py: { xs: 7, md: 10 },
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <Confetti width={1100} height={500} count={36} seed={8} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 36, md: 56 },
                color: palette.primaryDark,
                lineHeight: 1.05,
                mb: 1.5,
              }}
            >
              Join the movement
            </Typography>
            <Typography sx={{ fontSize: { xs: 18, md: 22 }, color: palette.teal, fontWeight: 600, mb: 4 }}>
              Currently seeking Paw Party sponsors
            </Typography>

            <Stack spacing={2} sx={{ maxWidth: 720, mx: 'auto', mb: 4 }}>
              <Typography sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.6, color: '#1E2022' }}>
                Become a Paw Party sponsor and make an impact that families, shelters, and pets will <em>feel</em>.
              </Typography>
              <Typography sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.6, color: '#475569' }}>
                Our platform gives sponsors meaningful visibility through branded placements, featured content, and partnership spotlights &mdash; all while supporting a mission rooted in animal welfare, community collaboration, and joyful adoption.
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                disableElevation
                size="large"
                href="mailto:hello@pawparty.org"
                sx={{
                  bgcolor: palette.gold,
                  color: '#1E2022',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 999,
                  px: 4,
                  py: 1.4,
                  fontSize: 16,
                  '&:hover': { bgcolor: '#e8b21f' },
                }}
              >
                Become a Sponsor
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="mailto:hello@pawparty.org"
                sx={{
                  color: palette.primary,
                  borderColor: palette.primary,
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 999,
                  px: 4,
                  py: 1.4,
                  fontSize: 16,
                  borderWidth: 2,
                  '&:hover': { borderColor: palette.primaryDark, borderWidth: 2, bgcolor: 'rgba(55,125,255,0.04)' },
                }}
              >
                Onboard a Shelter
              </Button>
            </Stack>

            <Typography sx={{ mt: 4, fontSize: 14, color: '#677788' }}>
              For partnerships, sponsorships, or shelter onboarding, contact us at:{' '}
              <MuiLink href="mailto:hello@pawparty.org" sx={{ color: palette.teal, fontWeight: 600 }}>
                hello@pawparty.org
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ======================================================================
// FOOTER
// ======================================================================
export function Footer() {
  return (
    <Box sx={{ pt: { xs: 6, md: 8 }, pb: 4, borderTop: '1px solid rgba(30,32,34,0.06)' }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <PawPartyLogo height={36} primary={palette.primary} accent={palette.accent} />
          <Stack direction="row" spacing={4} flexWrap="wrap">
            <MuiLink href="#about" underline="none" sx={{ color: '#677788', fontSize: 14 }}>About</MuiLink>
            <MuiLink href="#mission" underline="none" sx={{ color: '#677788', fontSize: 14 }}>Mission</MuiLink>
            <MuiLink href="#app" underline="none" sx={{ color: '#677788', fontSize: 14 }}>The App</MuiLink>
            <MuiLink href="#sponsor" underline="none" sx={{ color: '#677788', fontSize: 14 }}>Sponsor</MuiLink>
            <MuiLink href="mailto:hello@pawparty.org" underline="none" sx={{ color: '#677788', fontSize: 14 }}>Contact</MuiLink>
          </Stack>
          <Typography sx={{ color: '#677788', fontSize: 13 }}>
            &copy; 2026 Paw Party &middot; Volunteer-run 501(c)(3)
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
