import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const CTA = () => {
  return <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="gradient-bg rounded-3xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para Tomar Control de tu Presupuesto?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de estudiantes que ya están ahorrando dinero y construyendo mejores hábitos financieros con BudgetNest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg">
                Comenzar Gratis
              </Button>
            </Link>
            
          </div>
          <p className="text-sm mt-4 opacity-75">
            No se requiere tarjeta de crédito • Plan gratuito disponible para siempre
          </p>
        </div>
      </div>
    </section>;
};
export default CTA;