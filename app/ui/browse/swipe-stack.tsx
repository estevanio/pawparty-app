'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import PetCard from "./pet-card";
import { Container, Snackbar } from "@mui/material";
import { pets } from '@/app/lib/mockdb'
import { uptime } from "process";
import BrowseQuestionsDialogue from "./browse-questions-dialogue";
import { Pet } from "@/app/lib/definitions";

export default function SwipeStack () {
    
    const [lastDirection, setLastDirection] = useState('')
    const [swipeInProgress, setSwipeInProgress] = useState(false)
    const [questionsOpen, setQuestionsOpen] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [lastSwipedName, setLastSwipedName] = useState('')

    useEffect(() => {
      localStorage.getItem('questionsAnswered') ? null : setQuestionsOpen(true)
      localStorage.getItem('matches') ? null : localStorage.setItem('matches', JSON.stringify([]))
    }, [])
  
    const swiped: any = (direction: string, name: string, breed: string[]) => {

      // console.log('----------------------')
      // console.log('swiped name: ' + name)
      // console.log('swiped species: ' + breed[0])
      // console.log(localStorage.getItem('questionAnswer'))
      // console.log('match: ' + (breed[0] == localStorage.getItem('questionAnswer')))
      // console.log('----------------------')
      
      setSnackOpen(false)
      
      setLastDirection(direction)
      setSwipeInProgress(true)
    }
  
    const outOfFrame = (pet: Pet, direction: String) => {

      //needed to parse localStorage, likely will not be needed when dealing with live data      
      let matchString: any = localStorage.getItem('matches')
      let matchArray: any = JSON.parse(matchString)
      let arrayIds: String[] = []

      matchArray.forEach((pet: Pet) => {
        arrayIds.push(pet.id)
      })

      if (pet.breed[0] == localStorage.getItem('questionAnswer') && direction == 'right') {
        arrayIds.includes(pet.id) ? null: matchArray.push(pet)
        setSnackOpen(true)    
      }

      localStorage.setItem('matches', JSON.stringify(matchArray))
      arrayIds = []
      setLastSwipedName(pet.name)
      setSwipeInProgress(false)
    }

    const displayPets = pets.map((pet) => {        
        
        return(
            <TinderCard
                className="swipe"
                key={pet.id} 
                onSwipe={(dir) => {
                  swiped(dir, pet.name, pet.breed)}} 
                onCardLeftScreen={(dir) => outOfFrame(pet, dir)}
                preventSwipe={['up', 'down']}
                onSwipeRequirementUnfulfilled={() => setSwipeInProgress(false)}>
                <PetCard pet={pet} swipeInProgress={swipeInProgress}/>
            </TinderCard>
        )
    })
  
    return (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:475, width: '100vw'}}>
          {displayPets}
        </Container>
        <BrowseQuestionsDialogue 
          questionsOpen={questionsOpen} 
          setQuestionsOpen={setQuestionsOpen}/>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message={`Matched! Head over to matches to chat with ${lastSwipedName}`}
      />
      </>
    )
  }