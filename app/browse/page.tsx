import React from "react";
import SwipeStack from "../ui/browse/swipe-stack";
import { Container, Typography } from "@mui/material";
import { fetchAnimals } from "../lib/data";
import { AnimalData } from "../lib/definitions";

export default async function Page() {

  const animals: AnimalData[] = await fetchAnimals()

  return (
    <div className="appBody">
      <Container className="header" sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', paddingBottom: 5}}>
        <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
        <Typography>FIND YOUR PERFECT MATCH</Typography>
      </Container>
      <Container sx={{paddingLeft: 0, paddingRight: 0}}>
        <SwipeStack animalArray={animals} />        
      </Container>
      <div className="arrows">
        <img className="left-arrow" src="/left-arrow.svg" alt="left arrow" />
        <img className="right-arrow" src="/right-arrow.svg" alt="right arrow" />
      </div>
    </div>
  );
}
