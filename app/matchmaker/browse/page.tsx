import React from "react";
import SwipeStack from "@/app/ui/browse/swipe-stack";
import { Container, Typography } from "@mui/material";
import { fetchAnimals } from "@/app/lib/data";

export default async function Page() {

  const animals: any = await fetchAnimals()

  return (
    <>       
      <SwipeStack animalArray={animals} />
      <div className="arrows">
        <img className="left-arrow" src="/left-arrow.svg" alt="left arrow" />
        <img className="right-arrow" src="/right-arrow.svg" alt="right arrow" />
      </div>
    </>
  );
}
