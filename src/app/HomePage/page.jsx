"use client"
import DashboardHero from '@/components/HomePageComponents/DashboardHero'
import DashboardNavbar from '@/components/HomePageComponents/DashboardNavbar'
import EmptyStateCards from '@/components/HomePageComponents/EmptyStateCards'
import GuidancePanel from '@/components/HomePageComponents/GuidancePanel'
import TrustSafetyPanel from '@/components/HomePageComponents/TrustSafetyPanel'
import WorkflowSection from '@/components/HomePageComponents/WorkflowSection'
import Footer from '@/components/LandingPageComponenets/Footer'
import { useEffect, useState } from 'react'


const HomePage = () => {



    //     const [history, sethistory] = useState([]);
    //     const [final, setfinal] = useState({})

    //     console.log("final", final);
    //     console.log("history", history);
    // console.log(history.length)

    //     const gethistory = async () => {


    //         try {

    //             const response = await fetch("/api/DiagnosisHistory", {
    //                 method: "GET",
    //                 headers: { "Content-Type": "application/json" },
    //             })


    //             const data = await response.json();
    //             sethistory(data.Allhistory);
    //         } catch (err) {
    //             console.log(err.message);
    //         }


    //     }


    // const getfinal = async () => {


    //     try {

    //         const response = await fetch("/api/FinalLayer", {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //         })

    //         const data = await response.json();
    //         setfinal(data.result);
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

    // useEffect(() => {
    //     gethistory()
    //     getfinal()
    // }, [])

    return (
        <div className="min-h-screen bg-background">


            <DashboardNavbar />
            <DashboardHero />
            <WorkflowSection />
            <GuidancePanel />
            {/* <EmptyStateCards /> */}
            {/* <TrustSafetyPanel /> */}
            <Footer />
        </div>
    )
}

export default HomePage