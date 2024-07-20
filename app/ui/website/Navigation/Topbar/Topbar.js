'use client'
import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { default as NavItem } from './NavItem';
import pages from '@/app/ui/website/Navigation/navigation';
import { default as Sidebar } from '@/app/ui/website/Navigation/Sidebar/Sidebar';


const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const pathname=usePathname()
  const theme = useTheme();
  const { mode } = theme.palette;
  const {
    home: homePages,
    FAQ: faqPage,
    about: aboutPages,
    stories: storyPages,
    contact: contactPage,
  } = pages;

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <box>
      <AppBar
          position={'sticky'}
          sx={{
            top: 0,
            backgroundColor: trigger ? 'primary' : 'transparent',
          }}
          elevation={trigger ? 1 : 0}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
        >
          <Link href="/" passHref>
            <Box
              display={'flex'}
              title="Paw Party"
              width={{ xs: 100, md: 120 }}
            >
              <Box
                component={'img'}
                src={
                  mode === 'light' && !colorInvert
                    ? '/pawparty-logo.svg'
                    : '/pawparty-logo.svg'
                }
                height={1}
                width={1}
              />
            </Box>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
            <Box>
              <NavItem
                title={'Home'}
                id={'home-pages'}
                items={homePages}
                colorInvert={colorInvert}
              />
            </Box>
            <Box marginLeft={4}>
              <NavItem
                title={'About Us'}
                id={'about-pages'}
                items={aboutPages}
                colorInvert={colorInvert}
              />
            </Box>
            <Box marginLeft={4}>
              <NavItem
                title={'Success Stories'}
                id={'stories-pages'}
                items={storyPages}
                colorInvert={colorInvert}
              />
            </Box>
            <Box marginLeft={4}>
              <NavItem
                title={'Contact Us'}
                id={'contact-page'}
                items={contactPage}
                colorInvert={colorInvert}
              />
            </Box>
            <Box marginLeft={4}>
              <NavItem
                title={'FAQ'}
                id={'faqPage'}
                items={faqPage}
                colorInvert={colorInvert}
              />
            </Box>
            <Box marginLeft={4}>
              <Link href={'/matchmaker'} passHref>
                <Button type = "button" id= "linkToBrowse" variant='contained' size= 'large' color='secondary'>
                  <span className="hidden md:block">Click here to find your new friend</span>
                </Button>
              </Link> 
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
            <Button
              onClick={() => handleSidebarOpen()}
              aria-label="Menu"
              variant={'outlined'}
              sx={{
                borderRadius: 2,
                minWidth: 'auto',
                padding: 1,
                borderColor: alpha(theme.palette.divider, 0.2),
              }}
            >
              <MenuIcon />
            </Button>
          </Box>
        </Box>
      </AppBar>
      <Sidebar
          onClose={handleSidebarClose}
          open={open}
          variant="temporary"
      />
    </box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
