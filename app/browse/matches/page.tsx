import { Container } from "@mui/material"
import MatchCard from "../../ui/browse/matches/match-card.tsx"

export default function Page() {
    return (
     <>
      <Container className="header">
        <a href="index.html">
          <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
        </a>
        <h1>MY MATCHES</h1>
      </Container>
      <MatchCard />

      <Container className="message-card-containter">

        <Container className="message-card">
          <img className="matches-icon" src="charlie-icon.svg" />
          <Container className="matches-card-text">
            <h2>Charlie</h2>
            <h3 className="matches-type">Beagle Mix</h3>
            <p className="matches-location">Anaheim, CA</p>
          </Container>
        </Container>
        <Container className="message-card">
          <img className="matches-icon" src="taco-icon.svg" />
          <Container className="matches-card-text">
            <h2>Taco</h2>
            <h3 className="matches-type">Corgie</h3>
            <p className="matches-location">Cypress, CA</p>
          </Container>
        </Container>
      </Container>
    </>
    )
}