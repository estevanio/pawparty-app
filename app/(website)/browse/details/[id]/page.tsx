import React from "react";
import { fetchAnimalById } from "@/app/lib/data";

export default async function Page({params}: {params: {id: string}}) {

  const animal: any = await fetchAnimalById(params.id)
  
  return(
  <>
    <div className="header">
      <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
      <h1>FIND YOUR PERFECT MATCH</h1>
    </div>
    <p>{animal.id}</p>
    <p>{animal.name}</p>
    <p>{animal.shelter.location}</p>
    <img src={animal.photos[0].url} />
    <img src={animal.photos[2].url} />
    <img src={animal.photos[3].url} />
    <img src={animal.photos[4].url} />
  </>
  );
}
