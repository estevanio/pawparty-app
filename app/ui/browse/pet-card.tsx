'use client'

import React, { useState } from "react";
import TinderCard from 'react-tinder-card'
import { Card, CardContent, CardMedia, Typography, Container } from "@mui/material";
import { pets } from '@/app/lib/mockdb'
import { uptime } from "process";

export default function PetCard () {
    
    const [lastDirection, setLastDirection] = useState('')
  
    const swiped: any = (direction: string, nameToDelete: string) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name: string) => {
      console.log(name + ' left the screen!')
    }

    const displayPets = pets.map((pet) => {        
        
        return(
            <TinderCard
                className="swipe"
                key={pet.id} 
                onSwipe={(dir) => swiped(dir, pet.name)} 
                onCardLeftScreen={() => outOfFrame(pet.name)}
                preventSwipe={['up', 'down']}>
                <Card
                  id={'card itself'} 
                  raised={true}
                  sx={{
                    height: '484px',
                    borderRadius: '25px', 
                    userSelect:'none'}}>
                  <CardMedia
                    sx={{height: 379, width: '350px', maxWidth: {lg: 300}}}
                    image={pet.img_url}/>
                    <Container sx={{display: 'flex', justifyContent:'space-between'}}>
                      <CardContent 
                        sx={{paddingTop: 0, paddingLeft: 1, height: '109px'}}>
                        <Typography
                          sx={{
                            paddingTop: 1,
                            fontFamily: "Montserrat",
                            fontSize: 24, 
                            fontWeight: 700,
                            lineHeight: '30px'
                            }}>
                          {pet.name}
                        </Typography>
                        <Typography
                          sx={{fontFamily:'Montserrat', fontSize: 14}}>
                          {pet.breed[1]}
                        </Typography>
                        <Typography
                          sx={{fontSize: 14}}>
                          {pet.location[0] + ', ' + pet.location[1]}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography sx={{
                            fontFamily: "Montserrat", fontSize: 14}}>
                            {pet.tags[0]}
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Montserrat", fontSize: 14}}>
                            {pet.tags[1]}
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Montserrat", fontSize: 14}}>
                            {pet.tags[2] ? pet.tags[2] : null}
                        </Typography>
                      </CardContent>
                    </Container>
                </Card>
            </TinderCard>
        )
    })
  
    return (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:475, width: '100vw'}}>
          {displayPets}
        </Container>
        {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
      </>
    )
  }