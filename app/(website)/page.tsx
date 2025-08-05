import React from 'react';
import Box from '@mui/material/Box';
import Container from '@/app/ui/website/Container';
import Image from 'next/image';

import { default as Features } from '@/app/ui/website/Features';
import { default as Folio } from '@/app/ui/website/Folio';
import { default as Gallery } from '@/app/ui/website/Gallery';
import { default as Hero } from '@/app/ui/website/Hero';
import { default as Services } from '@/app/ui/website/Services';
import { default as HowItWorks} from '@/app/ui/website/HowItWorks';
import { default as Sponsors } from '@/app/ui/website/Sponsors';
import { Typography } from '@mui/material';

const siteLive = false

const Page = () => (

  siteLive ? 
  <>
    <Container id='herosection'>
      <Hero />
    </Container>
    <Container>
      <Folio />
    </Container>
    <Box bgcolor={'alternate.main'}>
      <Container>
        <Services />
      </Container>
    </Box>
    <Box bgcolor={'primary.main'}>
      <Container>
        <Features />
      </Container>
    </Box>
    <Container>
      <Gallery />
    </Container>
    <Container id='workssection'>
      <HowItWorks/>
    </Container>
    <Container id='sponsorsection'>
      <Sponsors/>
    </Container>
  </> :
  <>
  <Container>
    <Box sx={{ textAlign: 'center', padding: 1, backgroundColor: 'primary.main', rounded: '8px' }}> 
      <Image src="pawparty-logo.svg" alt="Logo" width={400} height={400} />
    </Box>
  <Typography sx={{textAlign: 'center', fontSize: 24, fontFamily: 'Montserrat', fontWeight: 'bold'}} >Site coming soon!</Typography>
  </Container>
  </>
  
);

export default Page;