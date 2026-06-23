"use client"


import { Layer1Response } from '@/Context/Layer1Response'
import { UserDetails } from '@/Context/userdetails'
import { useUser } from '@clerk/nextjs'

import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {



    const { isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (!isLoaded) return;

        if (isLoaded && isSignedIn === false) {
            localStorage.removeItem(
                "hasCompletedFirstDiagnosis"
            );
            localStorage.removeItem("userEnrolled");
        }
    }, [isLoaded, isSignedIn]);
    const [layer1data, setlayer1data] = useState({})

    return (
        <UserDetails.Provider value={{}}>
            <Layer1Response.Provider value={{ layer1data, setlayer1data }}>

                <div>


                    {children}



                </div>
            </Layer1Response.Provider>
        </UserDetails.Provider>
    )
}

export default Provider