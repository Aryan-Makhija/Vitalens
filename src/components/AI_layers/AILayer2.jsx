"use client"

import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { Layer1Response } from '@/Context/Layer1Response'

const AILayer2 = () => {


    const { form1Id, form2Id, layer1data, setlayer2Id } = useContext(Layer1Response)

    const Ailayer2 = async () => {
        try {
            const res = await fetch("/api/Layer2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    form1Id: form1Id,
                    form2Id: form2Id,
                    layer1ResultId: layer1data.layer1ResultId,
                }),
            })

            const data = await res.json()
            setlayer2Id(data.reportId)
            console.log("AI Layer2  RESPONSE", data)

        } catch (err) {
            console.error(err.message)
        }
    }



console.log(form1Id, form2Id,)
    return (
        <div>

            <Button onClick={Ailayer2}>AI Layer 2</Button>
        </div>
    )
}

export default AILayer2