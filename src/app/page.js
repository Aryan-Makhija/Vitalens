

"use client"
import { UserButton } from "@clerk/nextjs";
import Form1Page from "./UserForm1/page";
import Form2Page from "./UserForm2/page";
import { useContext } from "react";
import { Layer1Response } from "@/Context/Layer1Response";
import WeeklyFeedbackForm from "@/components/AI_layers/FeedbackForm";
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

  const { layer1data } = useContext(Layer1Response)

  return (

    <div className="bg-white w-screen h-screen">
      <p className="text-4xl text-black">
        FitIntell
        <UserButton></UserButton>
      </p>
      <Form1Page></Form1Page>

      {Object.keys(layer1data).length > 0 && (
        <Form2Page />
      )}


      <WeeklyFeedbackForm></WeeklyFeedbackForm>


      

      <div className="min-h-screen bg-background">
        {/* <Navbar /> */}
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
