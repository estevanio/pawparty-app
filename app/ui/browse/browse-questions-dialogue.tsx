'use client'
import React, { useState } from "react"
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
            <Container sx={{height: 400, width: '90vw', borderRadius: '25px'}}>
                <Typography>What species of friend are you looking for?</Typography>
                <Button onClick={() => handleButtonPress('cat')}>Cats</Button>
                <Button onClick={() => handleButtonPress('dog')}>Dogs</Button>
            </Container>
        </Dialog>        
    )
}