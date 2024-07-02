'use client'

import React, { useState, useEffect } from 'react'
import { Container, Typography } from "@mui/material"
import MatchCard from "./match-card"
import { AnimalData, Pet } from "@/app/lib/definitions"
import { fetchAnimalsByMatches } from '@/app/lib/data'

export default function MatchContainer () {  

  // This client component neccessary to use useEffect for localStorage. May be able to handle server-side eventually.

  const [matches, setMatches] = useState([])

  useEffect(() => {
    const matchString: any = localStorage.getItem('matches')
    const matchArray: any = JSON.parse(matchString)
    setMatches(matchArray)    
  }, [])

  const displayMatches: any = matches?.map((animal: AnimalData)=> <MatchCard key={animal.animal_id} animal={animal}/>)

    return (
        <>
            {displayMatches?.length > 0 ? displayMatches : <Typography sx={styles.largeText}>NO MATCHES YET</Typography>}
        </>
    )
}

const styles = {
    largeText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Montserrat',
        fontWeight: 400,
        fontSize: 24,
      }
}