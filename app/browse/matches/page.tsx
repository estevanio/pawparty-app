
import { Topbar } from "../../ui/website";

export default function Page() {
    return (
     <>
      <Topbar/>
      <div className="header">
        <a href="index.html">
          <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
        </a>
        <h1>MY MATCHES</h1>
      </div>
      <div className="message-card-containter">
        <a href="message.html">
          <div className="message-card">
            <img className="matches-icon" src="dino-icon.svg" />
            <div className="matches-card-text">
              <h2>Dino</h2>
              <h3 className="matches-type">German Shepherd Mix</h3>
              <p className="matches-location">Placentia, CA</p>
            </div>
          </div>
        </a>

        <div className="message-card">
          <img className="matches-icon" src="charlie-icon.svg" />
          <div className="matches-card-text">
            <h2>Charlie</h2>
            <h3 className="matches-type">Beagle Mix</h3>
            <p className="matches-location">Anaheim, CA</p>
          </div>
        </div>
        <div className="message-card">
          <img className="matches-icon" src="taco-icon.svg" />
          <div className="matches-card-text">
            <h2>Taco</h2>
            <h3 className="matches-type">Corgie</h3>
            <p className="matches-location">Cypress, CA</p>
          </div>
        </div>
      </div>
    </>
    )
}