import React from "react";
import PetCard from "../ui/browse/pet-card";
import { Container } from "@mui/material";

export default function Page() {
  return (
    <>
      <div className="header">
        <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
        <h1>FIND YOUR PERFECT MATCH</h1>
      </div>
      <Container sx={{paddingLeft: 0, paddingRight: 0}}>
        <PetCard/>        
      </Container>
      <div className="arrows">
        <img className="left-arrow" src="/left-arrow.svg" alt="left arrow" />
        <img className="right-arrow" src="/right-arrow.svg" alt="right arrow" />
      </div>
    </>
  );
}
