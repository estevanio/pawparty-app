'use client'
import React, { useState } from "react"
import { Dialog, Container, Button } from "@mui/material"

interface DialogProps {
    questionsOpen: boolean,
    setQuestionsOpen: Function,
    setQuestionAnswer: Function
}
export default function BrowseQuestionsDialogue ({questionsOpen, setQuestionsOpen, setQuestionAnswer}: DialogProps) {
    
    function handleButtonPress(value: string) {
        setQuestionAnswer(value)
        setQuestionsOpen(false)
    }

    return (
        <Dialog onClose={() => setQuestionsOpen(false)} open={questionsOpen}>
            <Container sx={{height: 400, width: '90vw', borderRadius: '25px'}}>
                <h1>What species of friend are you looking for?</h1>
                <Button onClick={() => handleButtonPress('cat')}>Cats</Button>
                <Button onClick={() => handleButtonPress('dog')}>Dogs</Button>
            </Container>
        </Dialog>        
    )
}