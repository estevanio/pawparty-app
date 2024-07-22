

import { Container } from "@mui/material"
import MatchContainer from "@/app/ui/browse/matches/match-container"

export default async function Page() {

    return (
     <>
      <Container className="header">
        <h1>MY MATCHES</h1>
      </Container>
      <MatchContainer/>
    </>
    )
}