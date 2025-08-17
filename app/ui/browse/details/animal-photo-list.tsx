'use client'

import { ImageList, ImageListItem, useMediaQuery } from "@mui/material"

export default function AnimalPhotoList( {animalPhotoArray, animalName}: {animalPhotoArray: any, animalName: string}) {    

    const matches: any = useMediaQuery('(min-width: 600px)')

    const animalImages: any = animalPhotoArray.map((photo: any) => {
        return (
        <ImageListItem sx={{}} key={photo.photo_id}>
        <img src={photo.url} alt={animalName} />
        </ImageListItem>
    )})    

    return (
      <>
        <ImageList sx={{width: matches ? '90%': null, height: 'auto', userSelect: 'none'}} cols={matches ? 4 : 1} rowHeight={400}>
            {animalImages}
        </ImageList>
      </>        
    )
}