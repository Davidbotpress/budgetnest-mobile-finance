import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Control de Presupuesto
              <br />
              <span className="text-gradient">Inteligente y Fácil</span>
            </h1>
            <p className="text-xl text-budget-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Toma el control de tus gastos mensuales con el seguimiento intuitivo de BudgetNest, 
              diseñado específicamente para estudiantes internacionales y personas conscientes de su presupuesto.
            </p>
          </div>
          
          <div className="animate-slide-up" style={{
          animationDelay: "0.2s"
        }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                  Comenzar Gratis
                </Button>
              </Link>
              
            </div>
          </div>

          <div className="animate-slide-up" style={{
          animationDelay: "0.4s"
        }}>
            <div className="inline-flex items-center space-x-2 text-budget-gray-500 text-sm">
              <span>Desplázate para explorar funciones</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;