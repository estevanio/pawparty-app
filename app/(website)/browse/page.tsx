import React from "react";
import SwipeStack from "../../ui/browse/swipe-stack";
import { Container} from "@mui/material";
import { fetchAnimals } from "../../lib/data";

export default async function Page() {

  const animals: any = await fetchAnimals()

  return (
    <div className="webApp">       
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
