import { Container } from "@mui/material"
import MatchContainer from "@/app/ui/browse/matches/match-container"
import { fetchAnimalsByMatches } from "@/app/lib/data"

export default async function Page() {

  const profileAnimals: string[] = []
  
  const animals: any = await fetchAnimalsByMatches(profileAnimals)

    return (
     <>
      <Container className="header">
        <a href="index.html">
          <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
        </a>
        <h1>MY MATCHES</h1>
      </Container>
      <MatchContainer/>
    </>
    )
}