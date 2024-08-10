'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';


export default function BottomNav() {
  const router = useRouter();
  const path: string = usePathname();

  const getValueFromPath = (path: string) => {
    switch (path) {
      case '/matchmaker/matches':
        return 1;
      case '/matchmaker':
      default:
        return 0;
    }
  };

  const [value, setValue] = React.useState(getValueFromPath(path));

  useEffect(() => {
    setValue(getValueFromPath(path));
  }, [path]);

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
          href={'/matchmaker/browse'}
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
