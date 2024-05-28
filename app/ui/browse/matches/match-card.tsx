'use client'

import React from "react";
import { 
    Card, Container, Avatar, Typography
} from "@mui/material";
import { Pet } from "@/app/lib/definitions";

interface InterfaceProps {
  pet: Pet
}

export default function MatchCard({pet}: InterfaceProps) {

    const handleClick = () => {
      console.log('match clicked')
    }

    return(
      <Card
        sx={styles.card}
        onClick={handleClick}>
          <Avatar sx={styles.avatar}/>
          <Container>
            <Typography sx={styles.largeText}>{pet.name}</Typography>
            <Typography sx={styles.smallText}>{pet.breed[1]}</Typography>
            <Typography sx={styles.smallText}>{pet.location[0] + ', ' + pet.location[1]}</Typography>
          </Container>
      </Card>
    )
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ededed',
    borderRadius: '28px',
    width: {
      sm: '400px',
      md: '100%',
      lg: '100%'
    },
    height: '81px',
    marginTop: '10px'},
  avatar: { 
      marginLeft: '10px', 
      height: '60px', 
      width: '60px'},
  largeText: { 
    fontFamily: 'Montserrat', 
    fontWeight: 700, 
    fontSize: 18, 
    lineHeight: '22px'},
  smallText: {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '15px'
  }
}