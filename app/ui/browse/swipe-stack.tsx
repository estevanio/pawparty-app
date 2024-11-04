'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import PetCard from "./pet-card";
import BrowseQuestionsDialogue from "./browse-questions-dialogue";
import { Container, Snackbar } from "@mui/material";
import { AnimalData } from "@/app/lib/definitions";
import { Animal } from "@prisma/client";

export default function SwipeStack (props: any) {
    
    const [animals, setAnimals] = useState(props.animalArray)
    const [stackedCards, setStackedCards] = useState([])
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
      let profileMatchIdList: String[] = []      
      
      matchArray.forEach((animal: Animal) => {
        profileMatchIdList.push(animal.animal_id)
      })

      const filteredAnimals: AnimalData[] = filterAnimalList(props.animalArray)  

      setMatchIds(profileMatchIdList)      
      setAnimals([...filteredAnimals])

    }, [])

    const filterAnimalList = (animalList: AnimalData[]) => {
      const filteredAnimals = animalList.filter(animal => !matchIds.includes(animal.animal_id))
      return filteredAnimals
    }
  
    const outOfFrame = (animal: AnimalData, direction: String) => {

      //need to parse localStorage for now.  
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

    
    const displayAnimals = animals?.map((animal: AnimalData) => {        
        
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