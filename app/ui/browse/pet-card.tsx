'use client'

import { Card, CardContent, CardMedia, Typography, Container } from "@mui/material";
import TinderCard from 'react-tinder-card'
import { Pet } from "@/app/lib/definitions";

interface InterfaceProps {
  pet: Pet
}

export default function PetCard ({ pet }: InterfaceProps)  {

    return (
        <Card
            id={'card itself'} 
            raised={false}
            sx={{
                height: '484px',
                borderRadius: '25px', 
                userSelect:'none'}}>
            <CardMedia
                sx={{height: 379, width: '350px', maxWidth: {lg: 300}}}
                image={pet.img_url}/>
            <Container sx={{display: 'flex', justifyContent:'space-between'}}>
                <CardContent 
                    sx={{paddingTop: 0, paddingLeft: 1, height: '109px'}}>
                    <Typography
                        sx={{
                            paddingTop: 1,
                            fontFamily: "Montserrat",
                            fontSize: 24, 
                            fontWeight: 700,
                            lineHeight: '29.26px'
                            }}>
                        {pet.name}
                    </Typography>
                    <Typography
                        sx={{fontFamily:'Montserrat', fontSize: 14}}>
                        {pet.breed[1]}
                    </Typography>
                    <Typography
                        sx={{fontSize: 14}}>
                        {pet.location[0] + ', ' + pet.location[1]}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography 
                        sx={{
                            fontFamily: "Montserrat", fontSize: 14}}>
                        {pet.tags[0]}
                    </Typography>
                    <Typography sx={{
                        fontFamily: "Montserrat", fontSize: 14}}>
                        {pet.tags[1]}
                    </Typography>
                    <Typography 
                        sx={{
                            fontFamily: "Montserrat", fontSize: 14}}>
                            {pet.tags[2] ? pet.tags[2] : null}
                    </Typography>
                </CardContent>
            </Container>
        </Card>

    )

}