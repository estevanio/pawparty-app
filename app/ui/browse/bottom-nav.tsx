'use client';

import React from 'react';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';


export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Browse"
          component={Link}
          href={'/matchmaker'}
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Matches"
          component={Link}
          href={'/matchmaker/matches'}
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
