import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

import NavItem from './NavItem';
import pages from '@/app/ui/website/Navigation/navigation';


const SidebarNav = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const {
    home: homePages,
    FAQ: faqPage,
    about: aboutPages,
    stories: storyPages,
    contact: contactPage,
  } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Link href="/" passHref>
          <Box
            display={'flex'}
            title="Paw Party"
            width={{ xs: 100, md: 120 }}
          >
            <Box
              component={'img'}
              src={
                mode === 'light'
                  ? '/pawparty-logo.svg'
                  : '/pawparty-logo.svg'
              }
              height={1}
              width={1}
            />
          </Box>
        </Link>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem title={'Home'} items={homePages} />
        </Box>
        <Box>
          <NavItem title={'About Us'} items={aboutPages} />
        </Box>
        <Box>
          <NavItem title={'Success Stories'} items={storyPages} />
        </Box>
        <Box>
          <NavItem title={'Contact Us'} items={contactPage} />
        </Box>
        <Box>
          <NavItem title={'FAQ'} items={faqPage} />
        </Box>
        <Box marginTop={2}>
          <Link href={'/browse'} passHref>
            <Button
              size={'large'}
              variant="contained"
              fullWidth
              target={'blank'}
              color='secondary'
            >
              <span className="hidden md:block">Click here to find your new friend</span>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default SidebarNav;
