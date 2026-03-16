import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Features from "@/components/Features";
import InlineCTA from "@/components/InlineCTA";
import HowItWorks from "@/components/HowItWorks";
import Solutions from "@/components/Solutions";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-dark">
      <Header />
      <Hero />
      <TrustBar />
      <Features />
      <InlineCTA />
      <HowItWorks />
      <Solutions />
      <InlineCTA />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
