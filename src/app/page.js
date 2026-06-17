
"use client"
import Navbar from "@/components/LandingPageComponenets/Navbar";
import HeroSection from "@/components/LandingPageComponenets/HeroSection";
import { FeaturesSection } from "@/components/LandingPageComponenets/FeaturesSection";
import HealthJourneySection from "@/components/LandingPageComponenets/HealthJourneySection";
import HowItWorksSection from "@/components/LandingPageComponenets/HowItWorksSection";
import TrustSection from "@/components/LandingPageComponenets/TrustSection";
import WeeklyPlanSection from "@/components/LandingPageComponenets/WeeklyPlanSection";
import CTASection from "@/components/LandingPageComponenets/CTASection";
import Footer from "@/components/LandingPageComponenets/Footer";



export default function Home() {



  return (

    <div className="">
    
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HealthJourneySection />
        <WeeklyPlanSection />
        <HowItWorksSection />
        <TrustSection />
        <CTASection />
        <Footer />
      </div>


    </div>
  );
}
