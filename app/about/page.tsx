import React from "react";

import { Topbar } from "../ui/website";

export default function Page(){
    return (
    <>
        <Topbar />
        About us
        <section id="Bios">
            <p>This is where the Bios should be</p>
        </section>
        <section id="ourMission">
            <p>This is where the Full Mission/Vision should be</p>
        </section>
    </>
);
}
