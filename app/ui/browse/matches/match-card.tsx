'use client'
import React from "react";
import { 
    Card, Container, Avatar, Typography
} from "@mui/material";
import { Pet } from "@/app/lib/definitions";

export default function MatchCard() {

    const handleClick = () => {
      console.log('match clicked')
    }

    return(
      <Card
        sx={styles.card}
        onClick={handleClick}>
          <Avatar sx={styles.avatar}/>
          <Container>
            <Typography sx={styles.largeText}>Dino</Typography>
            <Typography sx={styles.smallText}>German Shepherd Mix</Typography>
            <Typography sx={styles.smallText}>Placentia, CA</Typography>
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
      sm: '382px',
      md: '90%',
      lg: '90%'
    },
    height: '81px'},
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