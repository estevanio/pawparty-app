'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import PetCard from "./pet-card";
import { Container, Snackbar } from "@mui/material";
import { pets } from '@/app/lib/mockdb'
import { AnimalData } from "@/app/lib/definitions";
import BrowseQuestionsDialogue from "./browse-questions-dialogue";
import { Animal } from "@prisma/client";

export default function SwipeStack (props: any) {
    
    const [animals, setAnimals] = useState([])
    const [lastDirection, setLastDirection] = useState('')
    const [swipeInProgress, setSwipeInProgress] = useState(false)
    const [questionsOpen, setQuestionsOpen] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [lastSwipedName, setLastSwipedName] = useState('')
    const [matchIds, setMatchIds ] = useState<String[]>([]) 

    useEffect(() => {
      localStorage.getItem('questionsAnswered') ? null : setQuestionsOpen(true)
      localStorage.getItem('matches') ? null : localStorage.setItem('matches', JSON.stringify([]))

      let matchString: any = localStorage.getItem('matches')
      let matchArray: any = JSON.parse(matchString)
      let arrayIds: String[] = []

      matchArray.forEach((animal: Animal) => {
        arrayIds.push(animal.animal_id)
      })

      setMatchIds(arrayIds)
      setAnimals(props.animalArray)
    }, [])
  
    const swiped: any = (direction: string, name: string) => {
      
      setSnackOpen(false)
      
      setLastDirection(direction)
      setSwipeInProgress(true)
    }
  
    const outOfFrame = (animal: AnimalData, direction: String) => {

      //need to parse localStorage, likely will not be needed when dealing with live data  
      let matchString: any = localStorage.getItem('matches')
      let matchArray: any = JSON.parse(matchString)
      let arrayIds: String[] = []
      
      matchArray.forEach((animal: Animal) => {
        arrayIds.push(animal.animal_id)
      })

      if (animal.species == localStorage.getItem('questionAnswer') && direction == 'right') {
        arrayIds.includes(animal.animal_id) ? null: matchArray.push(animal)
        setSnackOpen(true)    
      }

      localStorage.setItem('matches', JSON.stringify(matchArray))
      arrayIds = []
      setLastSwipedName(animal.name)
      setSwipeInProgress(false)
    }

    const displayAnimals = animals?.filter((animal: Animal) => !matchIds.includes(animal.animal_id))
      .map((animal: AnimalData) => {        
        
        return(
            <TinderCard
                className="swipe"
                key={animal.animal_id} 
                onSwipe={(dir) => {
                  swiped(dir, animal.name, animal.breed)}} 
                onCardLeftScreen={(dir) => outOfFrame(animal, dir)}
                preventSwipe={['up', 'down']}
                onSwipeRequirementUnfulfilled={() => setSwipeInProgress(false)}>
                <PetCard animal={animal} swipeInProgress={swipeInProgress}/>
            </TinderCard>
        )
    })
  
    return (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {displayAnimals}
        </Container>
        <BrowseQuestionsDialogue 
          questionsOpen={questionsOpen} 
          setQuestionsOpen={setQuestionsOpen}/>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1500}
          onClose={() => setSnackOpen(false)}
          message={`Matched! Head over to matches to chat with ${lastSwipedName}`}/>
      </>
    )
  }