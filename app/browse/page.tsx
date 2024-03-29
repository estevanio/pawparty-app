import React from "react";
import PetCard from "../ui/browse/pet-card";

export default function Page() {
  return (
    <>
      <div className="header">
        <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
        <h1>FIND YOUR PERFECT MATCH</h1>
      </div>
      <div className="swiperContainer">
        <PetCard/>
      </div>
      <div className="arrows">
        <img className="left-arrow" src="/left-arrow.svg" alt="left arrow" />
        <img className="right-arrow" src="/right-arrow.svg" alt="right arrow" />
      </div>
    </>
  );
}
