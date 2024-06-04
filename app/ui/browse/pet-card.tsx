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
            sx={styles.card}>
            <CardActionArea 
                onClick={() => handleClick()}
                onTouchEnd={() => handleClick()}>
                <CardMedia
                    sx={styles.cardMedia}
                    image={pet.img_url}/>
                <Container sx={styles.cardContentContainer}>
                    <CardContent 
                        sx={styles.cardContent}>
                        <Typography
                            sx={styles.fontName}>
                            {pet.name}
                        </Typography>
                        <Typography
                            sx={styles.fontText}>
                            {pet.breed[1]}
                        </Typography>
                        <Typography
                            sx={styles.fontText}>
                            {pet.location[0] + ', ' + pet.location[1]}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{pointerEvents: 'none'}}>
                        <Typography 
                            sx={styles.fontText}>
                            {pet.tags[0]}
                        </Typography>
                        <Typography sx={styles.fontText}>
                            {pet.tags[1]}
                        </Typography>
                        <Typography 
                            sx={styles.fontText}>
                                {pet.tags[2] ? pet.tags[2] : null}
                        </Typography>
                    </CardContent>
                </Container>
            </CardActionArea>
        </Card>

    )

}

const styles = {
    card: {
        height: '484px',
        borderRadius: '25px', 
        userSelect:'none'},
    cardMedia: {
        height: 379, 
        width: '350px',
        maxWidth: {lg: 350, md: 350},
        pointerEvents: 'none'},
    cardContentContainer: {
        display: 'flex', 
        justifyContent:'space-between', 
        pointerEvents: 'none'},
    cardContent: {
        paddingTop: 0, 
        paddingLeft: 1, 
        height: '109px',
        pointerEvents: 'none'},
    fontName: {
        paddingTop: 1,
        fontFamily: "Montserrat",
        fontSize: 24, 
        fontWeight: 700,
        lineHeight: '29.26px'},
    fontText: {
        fontFamily:'Montserrat', 
        pointerEvents: 'none', 
        fontSize: 14}    
}