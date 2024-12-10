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
import { debug } from "console";

export default function QuestionnaireContainer () {
    const { setItem, getItem } = useLocalStorage()
    
    //working here to try getting component to rerender. Answers now work.
    const [species, setSpecies] = useState('')
    const [kids, setKids] = useState('')
    const [pets, setPets] = useState('')
    const [weight, setWeight] = useState('')
    const [senior, setSenior] = useState('')

    useEffect(()=> {
        setSpecies(getItem('species'))
        setKids(getItem('kids'))
        setPets(getItem('pets'))
    }, [])

    const handleSpeciesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        setSpecies(e.target.value)
    }
    const handleKidsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKids(e.target.value)
    }
    const handlePetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPets(e.target.value)
    }
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value)
    }
    const handleSeniorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSenior(e.target.value)
    }

    const handleSave = () => {
        setItem('species', species )
        setItem('kids', kids )
        setItem('pets', pets )
        setItem('weight', weight )
        setItem('senior', senior )
    }

    console.log({
        species: species,
        kids: kids,
        pets: pets,
        weight: weight,
        senior: senior,
    })

    return(
        <Container sx={{height: 650, overflow: 'auto'}}>
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
                        value={species}
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
                        value={kids}
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
                        value={pets}
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
                        Do you have a size limit?    
                    </FormLabel>
                    <RadioGroup
                        onChange={handleWeightChange}
                        value={weight}
                        >
                    <FormControlLabel value={'20'} control={<Radio />} label="Below 20 lbs." />
                    <FormControlLabel value={'40'} control={<Radio />} label="Below 40 lbs." />
                    <FormControlLabel value={'60'} control={<Radio />} label="Below 60 lbs." />
                    <FormControlLabel value={'300'} control={<Radio />} label="Any weight." />
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
                        Are you willing to care for a senior pet?    
                    </FormLabel>
                    <RadioGroup
                        onChange={handleSeniorChange}
                        value={senior}
                        >
                    <FormControlLabel value={'yes'} control={<Radio />} label="Yes" />
                    <FormControlLabel value={'no'} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Card>
            <Button sx={{
                width: '100px',
                backgroundColor: 'blue', 
                fontFamily: 'Montserrat', 
                color: 'white',
                border: 2,
                borderColor: 'white'
                }} onClick={handleSave}>Save</Button>
        </Container>
    )

}