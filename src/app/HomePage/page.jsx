import DashboardHero from '@/components/HomePageComponents/DashboardHero'
import DashboardNavbar from '@/components/HomePageComponents/DashboardNavbar'
import EmptyStateCards from '@/components/HomePageComponents/EmptyStateCards'
import GuidancePanel from '@/components/HomePageComponents/GuidancePanel'
import TrustSafetyPanel from '@/components/HomePageComponents/TrustSafetyPanel'
import WorkflowSection from '@/components/HomePageComponents/WorkflowSection'
import Footer from '@/components/LandingPageComponenets/Footer'


const HomePage = () => {
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