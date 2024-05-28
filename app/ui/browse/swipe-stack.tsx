'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import PetCard from "./pet-card";
import { Container } from "@mui/material";
import { pets } from '@/app/lib/mockdb'
import { uptime } from "process";
import BrowseQuestionsDialogue from "./browse-questions-dialogue";
import { Pet } from "@/app/lib/definitions";

export default function SwipeStack () {
    
    const [lastDirection, setLastDirection] = useState('')
    const [swipeInProgress, setSwipeInProgress] = useState(false)
    const [questionsOpen, setQuestionsOpen] = useState(false)

    useEffect(() => {
      localStorage.getItem('questionsAnswered') ? null : setQuestionsOpen(true)
      localStorage.getItem('matches') ? null : localStorage.setItem('matches', JSON.stringify([]))
    }, [])
  
    const swiped: any = (direction: string, name: string, breed: string[]) => {

      console.log('----------------------')
      console.log('swiped name: ' + name)
      console.log('swiped species: ' + breed[0])
      console.log(localStorage.getItem('questionAnswer'))
      console.log('match: ' + (breed[0] == localStorage.getItem('questionAnswer')))
      console.log('----------------------')

      setLastDirection(direction)
      setSwipeInProgress(true)
    }
  
    const outOfFrame = (pet: Pet, direction: String) => {
      //if pet is not already saved to matches and matches species and last swipe was right, add to matches.
      //in all other cases, do not add to matches. Either way set swipe in progress to false.

      if (pet.breed[0] == localStorage.getItem('questionAnswer') && direction == 'right') {
        console.log(pet.name + ' was swiped right and matched!')

        //needed to parse localStorage, likely will not be needed when dealing with live data
        let matchArray: any = localStorage.getItem('matches')
        console.log(JSON.parse(matchArray))

      } else {
        console.log('no match or swiped left')
      }

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
        {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
      </>
    )
  }