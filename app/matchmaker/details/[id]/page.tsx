import React from "react";
import { fetchAnimalById } from "@/app/lib/data";
import { Typography, Container, Card} from "@mui/material";
import AnimalPhotoList from "@/app/ui/browse/details/animal-photo-list";


export default async function Page({params}: {params: {id: string}}) {

  const animal: any = await fetchAnimalById(params.id)
  
  return(
  <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw'}}>    
    <Card sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#efefef', borderRadius: '25px', width: '90vw'}}>
      <Container sx={{width: 'auto'}}>
        <Typography sx={{
          paddingTop: 1,
          fontFamily: "Montserrat",
          fontSize: 24, 
          fontWeight: 700,
          lineHeight: '29.26px'}}>{animal.name}</Typography>
        <Typography sx={{
          fontFamily:'Montserrat', 
          pointerEvents: 'none', 
          fontSize: 20}}>{animal.age_group} {animal.sex}</Typography>
        {/* <Typography sx={{
          fontFamily:'Montserrat', 
          pointerEvents: 'none', 
          fontSize: 14}}>{animal.shelter.name}</Typography>
        <Typography sx={{
          fontFamily:'Montserrat', 
          pointerEvents: 'none', 
          fontSize: 14}}>{animal.shelter.location}</Typography> */}
        {/* <Typography sx={{
          fontFamily:'Montserrat', 
          pointerEvents: 'none', 
          fontSize: 14}}>{animal.shelter.phone_number}</Typography>         */}
      </Container>
      <AnimalPhotoList animalPhotoArray={animal.photos} animalName={animal.name}/>
    </Card>
  </Container>
  );
}
