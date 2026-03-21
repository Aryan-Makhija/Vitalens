"use client"


import { Layer1Response } from '@/Context/Layer1Response'
import { UserDetails } from '@/Context/userdetails'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {


    const { user } = useUser()


    const [userdetails, setuserdetails] = useState()

    const loginuser = async () => {


        try {

            const response = await axios.post("/api/user", {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress
            })

            // console.log(response.data)
            setuserdetails(response.data)

        } catch (err) {
            console.log(err.message)
        }

    }


    const [layer1data, setlayer1data] = useState({})
    const [form1Id, setform1Id] = useState()
    const [form2Id, setform2Id] = useState()
    const [layer2Id, setlayer2Id] = useState()

    useEffect(() => {
        user && loginuser()
    }, [user])





    return (
        <UserDetails.Provider value={{ userdetails, setuserdetails }}>
            <Layer1Response.Provider value={{ layer1data, setlayer1data, form1Id, setform1Id, form2Id, setform2Id, layer2Id, setlayer2Id }}>

                <div>


                    {children}



                </div>
            </Layer1Response.Provider>
        </UserDetails.Provider>
    )
}

export default Provider