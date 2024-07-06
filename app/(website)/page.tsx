import React from 'react';
import Box from '@mui/material/Box';
import Container from '@/app/ui/website/Container';

import { default as Features } from '@/app/ui/website/Features/Features';
import { default as Folio } from '@/app/ui/website/Folio/Folio';
import { default as Gallery } from '@/app/ui/website/Gallery/Gallery';
import { default as Hero } from '@/app/ui/website/Hero/Hero';
import { default as Services } from '@/app/ui/website/Services/Services';
import { default as HowItWorks} from '@/app/ui/website/HowItWorks/HowItWorks';
import { default as Sponsors } from '@/app/ui/website/Sponsors/Sponsors';

const Page = () => (
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
  </>
);

export default Page;