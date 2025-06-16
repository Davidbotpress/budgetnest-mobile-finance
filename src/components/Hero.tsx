
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Smart Budget Tracking
              <br />
              <span className="text-gradient">Made Simple</span>
            </h1>
            <p className="text-xl text-budget-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your monthly spending with BudgetNest's intuitive expense tracking designed specifically for international students and budget-conscious individuals.
            </p>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                Start Tracking Free
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="inline-flex items-center space-x-2 text-budget-gray-500 text-sm">
              <span>Scroll to explore features</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
