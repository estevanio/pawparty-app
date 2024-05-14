'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import PetCard from "./pet-card";
import { Card, CardContent, CardMedia, Typography, Container } from "@mui/material";
import { pets } from '@/app/lib/mockdb'
import { uptime } from "process";
import BrowseQuestionsDialogue from "./browse-questions-dialogue";

export default function SwipeStack () {
    
    const [lastDirection, setLastDirection] = useState('')
    const [swipeInProgress, setSwipeInProgress] = useState(false)
    const [questionsOpen, setQuestionsOpen] = useState(false)
    const [lookingFor, setLookingFor] = useState('')

    useEffect(() => {
      setQuestionsOpen(true)
    }, [])
  
    const swiped: any = (direction: string, nameToDelete: string) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
      setSwipeInProgress(true)
    }
  
    const outOfFrame = (name: string) => {
      console.log(name + ' left the screen!')
      setSwipeInProgress(false)
    }

    const displayPets = pets.map((pet) => {        
        
        return(
            <TinderCard
                className="swipe"
                key={pet.id} 
                onSwipe={(dir) => swiped(dir, pet.name)} 
                onCardLeftScreen={() => outOfFrame(pet.name)}
                preventSwipe={['up', 'down']}>
                <PetCard pet={pet} swipeInProgress={swipeInProgress}/>
            </TinderCard>
        )
    })
  
    return (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:475, width: '100vw'}}>
          {displayPets}
        </Container>
        <BrowseQuestionsDialogue questionsOpen={questionsOpen} setQuestionsOpen={setQuestionsOpen}/>
        {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
      </>
    )
  }