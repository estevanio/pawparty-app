import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// import Main from '../Main';
import Container from '../../Container';
import { Content, Footer, Headline } from './components';

const Faq = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box>
        <Box
          sx={{
            backgroundColor: theme.palette.main,
            backgroundImage: `linear-gradient(120deg, ${theme.palette.background.paper} 0%, ${theme.palette.main} 100%)`,
            marginTop: -13,
            paddingTop: 13,
          }}
        >
          <Container>
            <Headline />
          </Container>
        </Box>
        <Container maxWidth={800}>
          <Content />
        </Container>
        <Box bgcolor={theme.palette.main}>
          <Container>
            <Footer />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Faq;
