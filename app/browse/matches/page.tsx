
import { Topbar } from "../../ui/website";

import { Container } from "@mui/material"
import MatchContainer from "@/app/ui/browse/matches/match-container"

export default function Page() {

    return (
     <>
      <Topbar/>
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