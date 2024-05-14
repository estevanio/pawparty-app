'use client'
import React, { useState } from "react"
import { Dialog, Container, Button } from "@mui/material"

interface DialogProps {
    questionsOpen: boolean,
    setQuestionsOpen: Function
}

export default function BrowseQuestionsDialogue ({questionsOpen, setQuestionsOpen}: DialogProps) {

    return (
        <Dialog onClose={() => setQuestionsOpen(false)} open={questionsOpen}>
            <Container sx={{height: 400, width: '90vw'}}>
                <h1>What species of friend are you looking for?</h1>
                <Button>Cats</Button>
                <Button>Dogs</Button>
            </Container>
        </Dialog>        
    )
}