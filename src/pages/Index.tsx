
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TechnicalExplanation from '@/components/TechnicalExplanation';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <TechnicalExplanation />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
