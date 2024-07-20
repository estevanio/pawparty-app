import React from "react";

export default function Page() {
  return(
  <>
    <div className="header">
      <a href="index.html">
        <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
      </a>
      <h1>FIND YOUR PERFECT MATCH</h1>
    </div>

    <div className="messages-container">
      <h1 className="messages-name">Dino</h1>
      <div>
        <p className="messages-text">Hey! My name is Dino!</p>
      </div>
    </div>
  </>
  );
}
