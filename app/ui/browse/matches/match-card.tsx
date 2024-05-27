'use client'
import React from "react";
import { 
    Card, Container
} from "@mui/material";
import { Pet } from "@/app/lib/definitions";

export default function MatchCard() {

    return(
      <Card
        sx={{display: 'block', background: '#fff'}}>
          <img className="matches-icon" src="dino-icon.svg" />
          <div className="matches-card-text">
            <h2>Dino</h2>
            <h3 className="matches-type">German Shepherd Mix</h3>
            <p className="matches-location">Placentia, CA</p>
          </div>
      </Card>
    )
}