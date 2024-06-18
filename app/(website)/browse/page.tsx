import React from "react";
import SwipeStack from "../../ui/browse/swipe-stack";
import { Container, Typography } from "@mui/material";

export default function Page() {
  return (
    <>
      <Container className="header" sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', paddingBottom: 5}}>
        <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
        <Typography>FIND YOUR PERFECT MATCH</Typography>
      </Container>
      <Container sx={{paddingLeft: 0, paddingRight: 0}}>
        <SwipeStack/>        
      </Container>
      <div className="arrows">
        <img className="left-arrow" src="/left-arrow.svg" alt="left arrow" />
        <img className="right-arrow" src="/right-arrow.svg" alt="right arrow" />
      </div>
    </>
  );
}
