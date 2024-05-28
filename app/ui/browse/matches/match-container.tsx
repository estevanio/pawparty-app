'use client'

import { Container } from "@mui/material"
import MatchCard from "./match-card"
import { Pet } from "@/app/lib/definitions"

export default function MatchContainer () {

  // This client component neccessary to use localStorage. May be able to handle server-side eventually.
  
  const matchString: any = localStorage.getItem('matches')
  const matchArray: any = JSON.parse(matchString)
  const displayMatches: any = matchArray?.map((pet: Pet)=> <MatchCard key={pet.id} pet={pet}/>)

    return (
        <Container>
            {displayMatches}
        </Container>
    )
}