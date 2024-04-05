'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function PetCard () {
    
    const [lastDirection, setLastDirection] = useState('')
    const [pets, setPets] = useState([])
  
    const swiped: any = (direction: string, nameToDelete: string) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name: string) => {
      console.log(name + ' left the screen!')
    }

    useEffect(()=> {
        getPets()
    }, [])

    const getPets = async function () {
        const resp = await fetch('http://localhost:3001/pets')

        if (resp.ok) {
            setPets(await resp.json())
        }
    }

    const displayPets = pets.map((pet: {
        id: number, 
        name: string, 
        img_url: string, 
        age: number, 
        location: string,
        tags: string[],
        breed: string[]
    }) => {        
        
        return(
            <TinderCard 
                className='swipe' 
                key={pet.id} 
                onSwipe={(dir) => swiped(dir, pet.name)} 
                onCardLeftScreen={() => outOfFrame(pet.name)}>
                <Card raised={true}>
                  <CardMedia
                    sx={{height: 250, width: "250px"}}
                    image={pet.img_url}/>
                  <CardContent sx={{paddingTop: 0, paddingLeft: 1}}>
                    <Typography
                      sx={{fontSize: 16, fontWeight: "bold"}}>
                      {pet.name}
                    </Typography>
                    <Typography
                      sx={{fontSize: 12}}>
                      {pet.age} years old.<br/>
                      {pet.breed[1]}
                    </Typography>
                  </CardContent>
                </Card>
            </TinderCard>
        )
    })
  
    return (
      <div>
        <div className='cardContainer'>
          {displayPets}
        </div>
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      </div>
    )
  }