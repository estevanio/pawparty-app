'use client'

import React, { useState, useEffect } from 'react'
import { Container, Typography } from "@mui/material"
import MatchCard from "./match-card"
import { Pet } from "@/app/lib/definitions"

export default function MatchContainer () {

  // This client component neccessary to use localStorage. May be able to handle server-side eventually.

  const [matches, setMatches] = useState([])

  useEffect(() => {
    const matchString: any = localStorage.getItem('matches')
    const matchArray: any = JSON.parse(matchString)
    setMatches(matchArray)
  }, [])

  
  const displayMatches: any = matches?.map((pet: Pet)=> <MatchCard key={pet.id} pet={pet}/>)

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