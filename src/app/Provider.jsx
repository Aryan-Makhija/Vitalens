"use client"


import { Layer1Response } from '@/Context/Layer1Response'
import { UserDetails } from '@/Context/userdetails'
import { useUser } from '@clerk/nextjs'

import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {



    const { isSignedIn } = useUser();

    useEffect(() => {
        if (!isSignedIn) {
            localStorage.removeItem(
                "hasCompletedFirstDiagnosis"
            );
        }
    }, [isSignedIn]);

    const [layer1data, setlayer1data] = useState({})

    return (
        <UserDetails.Provider>
            <Layer1Response.Provider value={{ layer1data, setlayer1data }}>

                <div>


                    {children}



                </div>
            </Layer1Response.Provider>
        </UserDetails.Provider>
    )
}

export default Provider