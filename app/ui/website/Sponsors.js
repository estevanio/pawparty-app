'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Container from './Container';

const Sponsors = () => {
  const theme = useTheme();

  const infocontent = { 
    title: "We craft beautiful websites and digital products", 
    subtitle: [
      "Tell us your project requirements, budget, and timeline, ", 
      "and we will connect you with up to four companies that ", 
      "match your needs – all for free.",
    ],
    logos: [
            'https://assets.maccarianagency.com/svg/logos/airbnb-original.svg',
            'https://assets.maccarianagency.com/svg/logos/amazon-original.svg',
            'https://assets.maccarianagency.com/svg/logos/fitbit-original.svg',
            'https://assets.maccarianagency.com/svg/logos/netflix-original.svg',
            'https://assets.maccarianagency.com/svg/logos/google-original.svg',
            'https://assets.maccarianagency.com/svg/logos/paypal-original.svg',
            ],
  };

  return (
    <Box
      minHeight={'100vh'}
      display={'flex'}
      alignItems={'center'}
      bgcolor={'alternate.main'}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent={'center'}
            >
              <Box>
                <Typography
                  variant="h3"
                  align={'center'}
                  gutterBottom
                  sx={{
                    fontWeight: 900,
                  }}
                >
                  {infocontent.title}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  align={'center'}
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  {infocontent.subtitle[0]}
                  {infocontent.subtitle[1]}
                  {infocontent.subtitle[2]}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent={'center'}
            >
              <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
                {infocontent.logos.map((item, i) => (
                  <Box maxWidth={80} marginTop={2} marginRight={4} key={i}>
                    <Box
                      component="img"
                      height={90}
                      width={90}
                      src={item}
                      alt="..."
                      sx={{
                        filter:
                          theme.palette.mode === 'dark'
                            ? 'brightness(0) invert(0.7)'
                            : 'contrast(0) brightness(0)',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Sponsors;
