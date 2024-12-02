'use client'
import { 
    Container,
    FormControl, 
    FormControlLabel, 
    RadioGroup, 
    FormLabel, 
    Radio, 
    Card, 
    Button } from "@mui/material";
import { useLocalStorage } from "@/app/lib/custom-hooks/useLocalStorage";
import React, { useEffect, useState } from "react";

export default function QuestionnaireContainer () {
    const { setItem, getItem } = useLocalStorage()
    
    //working here to try getting component to rerender. Answers now work.
    const [questionAnswers, setQuestionAnswers] = useState(() => {
        const value = getItem('questionAnswers')
        return value
    })    

    const handleSpeciesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionAnswers({...questionAnswers, species: e.currentTarget.value})
    }
    const handleKidsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionAnswers({...questionAnswers, kids: e.currentTarget.value})
    }
    const handlePetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionAnswers({...questionAnswers, pets: e.currentTarget.value})
    }

    const handleSave = () => {
        setItem('questionAnswers', questionAnswers)
    }

    return(
        <Container sx={{height: 650}}>
            <Card sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ededed',
                borderRadius: '28px',
                width: {
                    sm: '400px',
                    md: '100%',
                    lg: '100%'
                },
                marginTop: '10px'}}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontFamily: 'Montserrat'}}>
                        What species are you looking for?    
                    </FormLabel>
                    <RadioGroup
                        onChange={handleSpeciesChange}
                        defaultValue={questionAnswers?.species}
                        value={questionAnswers?.species}
                        >
                    <FormControlLabel value="dog" control={<Radio />} label="Dogs" />
                    <FormControlLabel value="cat" control={<Radio />} label="Cats" />
                    <FormControlLabel value="both" control={<Radio />} label="Both" />
                    </RadioGroup>
                </FormControl>
            </Card>
            <Card sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ededed',
                borderRadius: '28px',
                width: {
                    sm: '400px',
                    md: '100%',
                    lg: '100%'
                },
                marginTop: '10px'}}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontFamily: 'Montserrat'}}>
                        Do you have children?    
                    </FormLabel>
                    <RadioGroup
                        onChange={handleKidsChange}
                        defaultValue={questionAnswers?.kids}
                        value={questionAnswers?.kids}
                        >
                    <FormControlLabel value={'yes'} control={<Radio />} label="Yes" />
                    <FormControlLabel value={'no'} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Card>
            <Card sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ededed',
                borderRadius: '28px',
                width: {
                    sm: '400px',
                    md: '100%',
                    lg: '100%'
                },
                marginTop: '10px'}}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontFamily: 'Montserrat'}}>
                        Do you have any other pets?    
                    </FormLabel>
                    <RadioGroup
                        onChange={handlePetsChange}
                        defaultValue={questionAnswers?.pets}
                        value={questionAnswers?.pets}
                        >
                    <FormControlLabel value={'yes'} control={<Radio />} label="Yes" />
                    <FormControlLabel value={'no'} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Card>
            <Button onClick={handleSave}>Save</Button>
        </Container>
    )

}