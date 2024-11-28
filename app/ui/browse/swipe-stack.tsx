'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import PetCard from "./pet-card";
import BrowseQuestionsDialogue from "./browse-questions-dialogue";
import { Container, Snackbar } from "@mui/material";
import { AnimalData } from "@/app/lib/definitions";
import { Animal } from "@prisma/client";

export default function SwipeStack (props: any) {
    
    const [animals, setAnimals] = useState([])
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

      console.log(animals)

      matchArray.forEach((animal: Animal) => {
        arrayIds.push(animal.animal_id)


      })

      setMatchIds(arrayIds)
      setAnimals(props.animalArray)
    }, [])
  
    const outOfFrame = (animal: AnimalData, direction: String) => {

      //need to parse localStorage for now.  
      let matchString: any = localStorage.getItem('matches')
      let matchArray: any = JSON.parse(matchString)
      let arrayIds: String[] = []
      
      matchArray.forEach((animal: Animal) => {
        arrayIds.push(animal.animal_id)
      })

      if (animal.species.toLowerCase() == localStorage.getItem('questionAnswer')?.toLowerCase() && direction == 'right') {
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
                onSwipe={() => {
                  setSnackOpen(false)
                  setSwipeInProgress(true)}} 
                onCardLeftScreen={(dir) => outOfFrame(animal, dir)}
                preventSwipe={['up', 'down']}
                onSwipeRequirementUnfulfilled={() => setTimeout(()=> setSwipeInProgress(false), 500)}>
                <PetCard animal={animal} swipeInProgress={swipeInProgress}/>
            </TinderCard>
        )
    })
  
    return (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 565}}>
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