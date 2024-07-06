import React from "react";

import { default as TeamProfiles } from "@/app/ui/website/About/TeamProfiles";

export default function Page(){
    return (
    <>
        About us
        <section id="Bios">
            <TeamProfiles></TeamProfiles>
        </section>
        <section id="ourMission">
            <p>This is where the Full Mission/Vision should be</p>
        </section>
    </>
);
}
