"use client"
import DashboardHero from '@/components/HomePageComponents/DashboardHero'
import DashboardNavbar from '@/components/HomePageComponents/DashboardNavbar'
import GuidancePanel from '@/components/HomePageComponents/GuidancePanel'
import WorkflowSection from '@/components/HomePageComponents/WorkflowSection'
import Footer from '@/components/LandingPageComponenets/Footer'


const HomePage = () => {

    return (
        <div className="min-h-screen bg-background">
            <DashboardNavbar />
            <DashboardHero />
            <WorkflowSection />
            <GuidancePanel />
            <Footer />
        </div>
    )
}

export default HomePage