'use client'

import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'

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
        console.log('hello')
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
                <div style={{ backgroundImage: 'url(' + pet.img_url + ')' }} className='card'>
                    <h3>{pet.name}</h3>
                </div>
            </TinderCard>
        )
    })
  
    return (
      <div>
        <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
        <h1>React Tinder Card</h1>
        <div className='cardContainer'>
          {displayPets}
        </div>
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      </div>
    )
  }