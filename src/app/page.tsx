import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ResultatHero from "@/components/ResultatHero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Integration from "@/components/Integration";
import Benefits from "@/components/Benefits";
import Analysis from "@/components/Analysis";
import HowItWorks from "@/components/HowItWorks";
import TargetAudience from "@/components/TargetAudience";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-deep">
      <Header />
      <Hero />
      <ResultatHero />
      <Problem />
      <Solution />
      <Integration />
      <Benefits />
      <Analysis />
      <HowItWorks />
      <TargetAudience />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
