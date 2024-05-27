'use client'
import React from "react";
import { 
    Card, Container, Avatar
} from "@mui/material";
import { Pet } from "@/app/lib/definitions";

export default function MatchCard() {

    return(
      <Card
        sx={{
          display: 'flex', 
          background: '#ededed',
          borderRadius: '28px',
          width: {
            sm: '382px',
            md: '90%',
            lg: '90%'
          },
          height: '81px'}}>
          <Avatar className="matches-icon" src="dino-icon.svg" />
          <Container className="matches-card-text">
            <h2>Dino</h2>
            <h3 className="matches-type">German Shepherd Mix</h3>
            <p className="matches-location">Placentia, CA</p>
          </Container>
      </Card>
    )
}