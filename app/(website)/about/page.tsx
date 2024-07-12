import React from "react";

import { AboutDefault } from "@/app/ui/about";

export default function Page(){
    return (
    <>
        About us
        <section id="Bios">
            <AboutDefault></AboutDefault>
        </section>
        <section id="ourMission">
            <p>This is where the Full Mission/Vision should be</p>
        </section>
    </>
);
}
