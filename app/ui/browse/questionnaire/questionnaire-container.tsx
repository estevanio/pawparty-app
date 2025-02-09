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
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/lib/custom-hooks/useLocalStorage";
import React, { useEffect, useState } from "react";


export default function QuestionnaireContainer () {

    const router = useRouter()
    const { setItem, getItem } = useLocalStorage()
    
    //working here to try getting component to rerender. Answers now work.
    const [species, setSpecies] = useState('')
    const [kids, setKids] = useState('')
    const [pets, setPets] = useState('')
    const [weight, setWeight] = useState('')
    const [senior, setSenior] = useState('')

    useEffect(()=> {
        
        if (getItem('questionsAnswered')){
            setSpecies(getItem('species'))
            setKids(getItem('kids'))
            setPets(getItem('pets'))
            setWeight(getItem('weight'))
            setSenior(getItem('senior'))
        }
        
    }, [])

    const handleSpeciesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
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
        setItem('questionsAnswered', true)
        router.push(`/matchmaker/browse`)        
    }

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
                    <FormControlLabel  control={<Radio value="dog"/>} label="Dogs" />
                    <FormControlLabel  control={<Radio value="cat"/>} label="Cats" />
                    <FormControlLabel control={<Radio value="both" />} label="Both" />
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
                    <FormControlLabel  control={<Radio value={'yes'}/>} label="Yes" />
                    <FormControlLabel  control={<Radio value={'no'}/>} label="No" />
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
                    <FormControlLabel  control={<Radio value={'yes'}/>} label="Yes" />
                    <FormControlLabel  control={<Radio value={'no'}/>} label="No" />
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
                    <FormControlLabel  control={<Radio value={'20'}/>} label="Below 20 lbs." />
                    <FormControlLabel  control={<Radio value={'40'}/>} label="Below 40 lbs." />
                    <FormControlLabel  control={<Radio value={'60'}/>} label="Below 60 lbs." />
                    <FormControlLabel  control={<Radio value={'300'}/>} label="Any weight." />
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
                    <FormControlLabel  control={<Radio value={'yes'}/>} label="Yes" />
                    <FormControlLabel  control={<Radio value={'no'}/>} label="No" />
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