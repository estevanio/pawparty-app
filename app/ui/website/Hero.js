'use client';

import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import LaptopSkeletonIllustration from 'app/ui/website/svg/illustrations/LaptopSkeleton.js';

import Container from './Container';
import { Button } from '@mui/material';

const Hero = () => {
  const pathname=usePathname()
  // useEffect(() => {
  //   const jarallaxInit = async () => {
  //     const jarallaxElems = document.querySelectorAll('.jarallax');
  //     if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
  //       return;
  //     }

  //     const { jarallax } = await import('jarallax');
  //     jarallax(jarallaxElems, { speed: 0.2 });
  //   };

  //   jarallaxInit();
  // });

  const theme = useTheme();

  const infocontent = { 
    title: "Designed secure. Built for anything", 
    subtitle: "Forward thinking businesses use our cloud backup service to ensure data reliability and safety.",
    image: "https://assets.maccarianagency.com/screenshots/dashboard.png"
  };

  return (
    <Box
      position={'relative'}
      sx={{
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.primary.main
            : theme.palette.alternate.main,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item container alignItems={'center'} xs={12} md={6}>
            <Box>
              <Box marginBottom={2}>
                <Typography
                  component={'span'}
                  variant="h3"
                  sx={{ fontWeight: 700, color: 'common.white' }}
                >
                  {infocontent.title}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                component="p"
                sx={{ color: 'common.white' }}
              >
                {infocontent.subtitle}
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={'flex-start'}
                marginTop={2}
              >
                <Link href={'/matchmaker/browse'} passHref>
                  <Button type = "button" id= "linkToBrowse" variant='contained' size= 'large' color='success'>
                      <span className="hidden md:block">Click here to find your new friend</span>
                  </Button>
                </Link> 
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                marginX: 'auto',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  marginX: 'auto',
                }}
              >
                <Box>
                  <Box
                    position={'absolute'}
                    top={'8.4%'}
                    left={'12%'}
                    width={'76%'}
                    height={'83%'}
                    border={`1px solid ${theme.palette}`}
                    zIndex={3}
                  >
                    <Box
                      component={'img'}
                      src={infocontent.image}
                      alt="Image Description"
                      width={450}
                      height={325}
                      sx={{
                        objectFit: 'cover',
                        filter:
                          theme.palette.mode === 'dark'
                            ? 'brightness(0.7)'
                            : 'none',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1921 273"
        sx={{
          position: 'relative',
          width: '100%',
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
          height: '35%',
        }}
      >
        <polygon
          fill={theme.palette.background.paper}
          points="0,273 1921,273 1921,0 "
        />
      </Box>
    </Box>
  );
};

export default Hero;