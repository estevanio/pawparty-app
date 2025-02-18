import React from "react";
import { Container, Typography } from "@mui/material";
import QuestionnaireContainer from "@/app/ui/browse/questionnaire/questionnaire-container";

export default function Page () {

    return (
        <>
        <Container className="header">
            <Typography sx={{fontFamily: 'Montserrat'}}>PROFILE BUILDER</Typography>
        </Container>
        <QuestionnaireContainer/>
        </>
    )
}