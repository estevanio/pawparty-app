import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Container, 
    CardActionArea 
} from "@mui/material";
import { Pet } from "@/app/lib/definitions";

interface InterfaceProps {
  pet: Pet,
  swipeInProgress: boolean
}

export default function PetCard ({ pet, swipeInProgress }: InterfaceProps)  {

    const handleClick = () => {
        if (swipeInProgress == false){ 
            console.log(`${pet.name} was clicked.`)
        }        
    }

    return (
        <Card
            id={'card itself'} 
            raised={false}
            sx={{
                height: '484px',
                borderRadius: '25px', 
                userSelect:'none'}}>
            <CardActionArea 
                onClick={() => handleClick()}
                onTouchEnd={() => handleClick()}>
                <CardMedia
                    sx={{
                        height: 379, 
                        width: '350px',
                        maxWidth: {lg: 300},
                        pointerEvents: 'none'}}
                    image={pet.img_url}/>
                <Container sx={{
                    display: 'flex', 
                    justifyContent:'space-between', 
                    pointerEvents: 'none'}}>
                    <CardContent 
                        sx={{
                            paddingTop: 0, 
                            paddingLeft: 1, 
                            height: '109px',
                            pointerEvents: 'none'}}>
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
                            sx={{
                                fontFamily:'Montserrat', 
                                pointerEvents: 'none', 
                                fontSize: 14}}>
                            {pet.breed[1]}
                        </Typography>
                        <Typography
                            sx={{
                                pointerEvents: 'none', 
                                fontSize: 14}}>
                            {pet.location[0] + ', ' + pet.location[1]}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{pointerEvents: 'none'}}>
                        <Typography 
                            sx={{
                                fontFamily: "Montserrat", 
                                fontSize: 14, 
                                pointerEvents: 'none'}}>
                            {pet.tags[0]}
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Montserrat", 
                            fontSize: 14, 
                            pointerEvents: 'none'}}>
                            {pet.tags[1]}
                        </Typography>
                        <Typography 
                            sx={{
                                fontFamily: "Montserrat", 
                                pointerEvents: 'none', 
                                fontSize: 14}}>
                                {pet.tags[2] ? pet.tags[2] : null}
                        </Typography>
                    </CardContent>
                </Container>
            </CardActionArea>
        </Card>

    )

}