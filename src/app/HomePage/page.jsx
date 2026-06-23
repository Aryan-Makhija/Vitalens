"use client"
import DashboardHero from '@/components/HomePageComponents/DashboardHero'
import DashboardNavbar from '@/components/HomePageComponents/DashboardNavbar'
import GuidancePanel from '@/components/HomePageComponents/GuidancePanel'
import WorkflowSection from '@/components/HomePageComponents/WorkflowSection'
import Footer from '@/components/LandingPageComponenets/Footer'
import { useEffect, useState } from 'react'
import { GetUser } from '../api/user/getuser/route'


const HomePage = () => {
    const [hasCompletedFirstDiagnosis, setHasCompletedFirstDiagnosis] =
        useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [userEnrolled, setuserEnrolled] = useState(false);

    useEffect(() => {
        const userStatus = async () => {
            const storedValue = localStorage.getItem("userEnrolled");

            if (storedValue !== null) {
                setuserEnrolled(storedValue === "true");
                return;
            }

            const userDetails = await GetUser();

            setuserEnrolled(userDetails.isUserEnrolled);
            localStorage.setItem(
                "userEnrolled",
                String(userDetails.isUserEnrolled)
            );
        };

        userStatus();
    }, []);


    useEffect(() => {
        const loadDiagnosisStatus = async () => {
            const cached = localStorage.getItem(
                "hasCompletedFirstDiagnosis"
            );

            if (cached === "true") {
                setHasCompletedFirstDiagnosis(true);
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/DiagnosisHistory");
                const data = await response.json();

                const completed =
                    data.Allhistory && data.Allhistory.length > 0;

                setHasCompletedFirstDiagnosis(completed);

                if (completed) {
                    localStorage.setItem(
                        "hasCompletedFirstDiagnosis",
                        "true"
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDiagnosisStatus();
    }, []);
    return (
        <div className="min-h-screen bg-background">
            <DashboardNavbar hasCompletedFirstDiagnosis={hasCompletedFirstDiagnosis} />
            <DashboardHero hasCompletedFirstDiagnosis={hasCompletedFirstDiagnosis} isLoading={isLoading} userEnrolled={userEnrolled} />
            <WorkflowSection />
            <GuidancePanel />
            <Footer />
        </div>
    )
}

export default HomePage