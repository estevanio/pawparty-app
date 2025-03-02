import {Card, CardContent, CardMedia, Typography, Container, CardActionArea} from "@mui/material";
import { AnimalData } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export default function PetCard ({ animal, swipeInProgress }: {animal: AnimalData, swipeInProgress: boolean}){ 

    const router = useRouter()

    const handleClick = () => {
        if (swipeInProgress == false){ 
            console.log(`${animal.name} was clicked.`)
            // router.push(`/matchmaker/details/${animal.animal_id}`)
        }        
    }

    return (
        <>
            <Card
                raised={false}
                sx={styles.card}
                onClick={() => handleClick()}
                onTouchEnd={() => handleClick()}>
                    <CardMedia
                        sx={styles.cardMedia}
                        image={animal.photos[0]?.url}/>
                    <Container sx={styles.cardContentContainer}>
                        <CardContent 
                            sx={styles.cardContent}>
                            <Typography
                                noWrap={true}
                                sx={styles.fontName}>
                                {animal.name}
                            </Typography>
                            <Typography
                                sx={styles.fontText}>
                                {animal.breed}
                            </Typography>
                            <Typography
                                sx={styles.fontText}>
                                {animal.shelter.location}
                            </Typography>
                        </CardContent>
                        <CardContent sx={{pointerEvents: 'none'}}>
                            <Typography
                                noWrap={true}
                                sx={styles.fontText}>
                                {animal.attributes[0] ? animal.attributes[0].attribute : null}
                            </Typography>
                            <Typography
                                noWrap={true}
                                sx={styles.fontText}>
                                {animal.attributes[1] ? animal.attributes[1].attribute : null}
                            </Typography>
                            <Typography 
                                noWrap={true}
                                sx={styles.fontText}>
                                {animal.attributes[2] ? animal.attributes[2].attribute : null}
                            </Typography>
                        </CardContent>
                    </Container>
            </Card>
        </>
    )

}

const styles = {
    card: {
        height: '484px',
        width:'350px',
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