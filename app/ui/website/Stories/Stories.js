'use client'
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Container from '../Container';

const Story = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const infoContent ={
    body : [
    "First class templates. These guys know what they're doing: great",
    "code quality, clear naming conventions and clear code structure.",
    "Plain awesome and a pleasure to work with.",
    ],
    personImage: "https://assets.maccarianagency.com/backgrounds/img4.jpg",
    personName: "Jhon Anderson",
    subtitle: "MUI lover"
  }
  return (
    <Container>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid item xs={12} md={6}>
          <Box marginBottom={4}>
            <Box
              component="img"
              height={1}
              width={1}
              src={
                '/pawparty-logo.svg'
              }
              alt="..."
              maxWidth={{ xs: 80, sm: 100, md: 120 }}
              marginBottom={2}
              sx={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(0) invert(0.7)'
                    : 'none',
              }}
            />
            <Typography variant={'h6'} component={'p'}>
              {infoContent.body[0]}
              {infoContent.body[1]}
              {infoContent.body[2]}
            </Typography>
            <Box marginTop={{ xs: 2, sm: 4 }}>
              <Typography variant={'h6'} sx={{ fontWeight: 700 }}>
                {infoContent.personName}
              </Typography>
              <Typography color="text.secondary">{infoContent.subtitle}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box component={Card} boxShadow={4} height={1} width={1}>
            <Box
              component={CardMedia}
              height={1}
              width={1}
              minHeight={300}
              image = {infoContent.personImage}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Story;
