"use Client"

import { Layer1Response } from '@/Context/Layer1Response'
// import { NextResponse } from 'next/server';
import React, { useContext } from 'react'
import { Button } from '../ui/button';

const FinalLayer = () => {


    const { layer2Id } = useContext(Layer1Response);

    const FinallayerResponse = async () => {


        try {


            const res = await fetch("/api/FinalLayer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    layer2ReportId: layer2Id
                })
            })


            const data = await res.json()
            console.log("Final layer Response", data);
        } catch (err) {
            return console.log(err.message)

        }



    }

    return (
        <div>
            <Button onClick={FinallayerResponse} className="mt-10">
                Final Layer
            </Button>
        </div>
    )
}

export default FinalLayer