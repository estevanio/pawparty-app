import React from 'react';
import Box from '@mui/material/Box';
import Container from '@/app/ui/website/Container';



import { Features, Folio, Gallery, Hero, Services, HowItWorks, Sponsors } from '@/app/ui/website';

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