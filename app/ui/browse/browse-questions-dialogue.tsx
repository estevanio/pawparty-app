'use client'
import React from "react"
import { Dialog, Container, Button, Typography } from "@mui/material"

interface DialogProps {
    questionsOpen: boolean,
    setQuestionsOpen: Function
}
export default function BrowseQuestionsDialogue ({questionsOpen, setQuestionsOpen}: DialogProps) {
    
    function handleButtonPress(value: string) {
        localStorage.setItem('questionsAnswered', JSON.stringify(true))
        localStorage.setItem('questionAnswer', value)
        setQuestionsOpen(false)
    }

    return (
        <Dialog onClose={() => setQuestionsOpen(false)} open={questionsOpen}>
            <Container sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems:'center', 
                height: 400, 
                width: '90%', 
                borderRadius: '25px'}}>
                <Typography sx={{fontFamily: 'Montserrat', fontSize: 16}}>What species of friend are you looking for?</Typography>
                <Button 
                    sx={{width: 100, marginTop:2}}
                    variant='contained' 
                    onClick={() => handleButtonPress('cat')}>Cats</Button>
                <Button 
                    sx={{width: 100, marginTop:2}}
                    variant='contained' 
                    onClick={() => handleButtonPress('dog')}>Dogs</Button>
            </Container>
        </Dialog>        
    )
}