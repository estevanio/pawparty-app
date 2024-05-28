import React from 'react';
import Box from '@mui/material/Box';
import Container from '@/app/ui/website/Container';


import { Features, Folio, Gallery, Hero, Services, HowItWorks } from '@/app/ui/website';

const Page = () => (
  <>
    <Hero />
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
    <Container>
      <HowItWorks/>
    </Container>
  </>
);

export default Page;
