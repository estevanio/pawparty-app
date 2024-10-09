import { Container } from '@mui/material';
import MatchContainer from '@/app/ui/browse/matches/match-container';
import React from 'react';

export default async function Page() {
    return (
     <>
      <Container className="header">
        <h1>MY MATCHES</h1>
      </Container>
      <MatchContainer/>
    </>
    )
}
