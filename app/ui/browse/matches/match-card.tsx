'use client'

import React from "react";
import { 
    Card, Container, Avatar, Typography
} from "@mui/material";
import { AnimalData, Pet } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

interface InterfaceProps {
  animal: AnimalData
}

export default function MatchCard({animal}: InterfaceProps) {

  const router = useRouter()

  const handleClick = () => {
      router.push(`/browse/details/${animal.animal_id}`)
  }    

    return(
      <Card
        sx={styles.card}
        onClick={handleClick}>
          <Avatar src={animal.photos[0].url} sx={styles.avatar}/>
          <Container>
            <Typography sx={styles.largeText}>{animal.name}</Typography>
            <Typography sx={styles.smallText}>{animal.breed}</Typography>
            <Typography sx={styles.smallText}>{animal.shelter.location}</Typography>
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