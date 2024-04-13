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

    console.log(pets)

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
                    borderRadius: '16px', 
                    userSelect:'none'}}>
                  <CardMedia
                    sx={{height: 375, width: '90vw'}}
                    image={pet.img_url}/>
                    <Container sx={{display: 'flex', justifyContent:'space-between'}}>
                      <CardContent 
                        sx={{paddingTop: 0, paddingLeft: 1, height: 'auto'}}>
                        <Typography
                          sx={{
                            fontSize: 18, 
                            fontWeight: "bold"
                            }}>
                          {pet.name}
                        </Typography>
                        <Typography
                          sx={{fontSize: 12}}>
                          {pet.breed[1]}
                        </Typography>
                        <Typography
                          sx={{fontSize: 12}}>
                          {pet.location[0] + ', ' + pet.location[1]}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography sx={{fontSize: 12}}>
                            {pet.tags[0]}
                        </Typography>
                        <Typography sx={{fontSize: 12}}>
                            {pet.tags[1]}
                        </Typography>
                        <Typography sx={{fontSize: 12}}>
                            {pet.tags[2] ? pet.tags[2] : '-'}
                        </Typography>
                      </CardContent>
                    </Container>
                </Card>
            </TinderCard>
        )
    })
  
    return (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:475, width: '100vw' }}>
          {displayPets}
        </Container>
        {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
      </>
    )
  }