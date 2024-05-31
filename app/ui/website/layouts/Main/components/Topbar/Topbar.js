'use client'
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavItem } from './components';
import pages from '@/app/ui/website/layouts/navigation';


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

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
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
        <Button type = "button" id= "linkToBrowse" variant='contained' size= 'large' color='secondary'>
          <Link
            href={'/browse'}
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-large text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
            <span className="hidden md:block">Click here to find your new friend</span>
          </Link> 
        </Button>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
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
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
