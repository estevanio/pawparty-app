'use client'
import React from "react"
import { Dialog, Container, Button, Typography } from "@mui/material"
import { useLocalStorage } from "@/app/lib/custom-hooks/useLocalStorage"

interface DialogProps {
    questionsOpen: boolean,
    setQuestionsOpen: Function
}

export default function BrowseQuestionsDialogue ({questionsOpen, setQuestionsOpen}: DialogProps) {

    const { setItem } = useLocalStorage()
    
    function handleButtonPress(value: unknown) {
        setItem('questionsAnswered', true)
        setItem('questionAnswer', value)
        setQuestionsOpen(false)
    }

    return (
        <Dialog onClose={() => setQuestionsOpen(false)} open={questionsOpen}>
            <Container>
                <Container sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems:'center', 
                    height: 400, 
                    width: '90%', 
                    borderRadius: '25px'}}>
                    <Container>
                        <Typography sx={{fontFamily: 'Montserrat', fontSize: 16}}>What species of friend are you looking for?</Typography>
                        <Button 
                            sx={{width: 100, marginBottom:2}}
                            variant='contained' 
                            onClick={() => handleButtonPress('Cat')}>Cats</Button>
                        <Button 
                            sx={{width: 100, marginBottom:2}}
                            variant='contained' 
                            onClick={() => handleButtonPress('Dog')}>Dogs</Button>
                    </Container>
                    <Container>
                        <Typography sx={{fontFamily: 'Montserrat', fontSize: 16}}>Do you have any children below the age of 13?</Typography>
                        <Button 
                            sx={{width: 100, marginBottom:2}}
                            variant='contained' 
                            onClick={() => handleButtonPress(true)}>Yes</Button>
                        <Button 
                            sx={{width: 100, marginBottom:2}}
                            variant='contained' 
                            onClick={() => handleButtonPress(false)}>No</Button>
                    </Container>
                </Container>
            </Container>
        </Dialog>        
    )
}