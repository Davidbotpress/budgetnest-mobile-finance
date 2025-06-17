import { Shield, Smartphone, Cloud, Zap } from 'lucide-react';
const TechnicalExplanation = () => {
  const features = [{
    icon: Shield,
    title: "Seguridad Avanzada",
    description: "Cifrado de extremo a extremo para proteger tus datos financieros personales."
  }, {
    icon: Smartphone,
    title: "Diseño Responsivo",
    description: "Optimizado para móviles, tablets y escritorio con una experiencia fluida."
  }, {
    icon: Cloud,
    title: "Sincronización en la Nube",
    description: "Accede a tus datos desde cualquier dispositivo con sincronización automática."
  }, {
    icon: Zap,
    title: "Rendimiento Rápido",
    description: "Carga instantánea y análisis en tiempo real de tus gastos."
  }];
  return <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Tecnología
            <span className="text-gradient block">de Vanguardia</span>
          </h2>
          <p className="text-xl text-budget-gray-600 max-w-3xl mx-auto">
            BudgetNest está construido con las últimas tecnologías web para ofrecerte una experiencia 
            segura, rápida y confiable en el seguimiento de tus finanzas personales.
          </p>
        </div>

        

        <div className="bg-budget-gray-50 rounded-2xl p-8 sm:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">
              ¿Por qué Elegir BudgetNest?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-primary mb-2">Interfaz Intuitiva</h4>
                <p className="text-budget-gray-600 text-sm">
                  Diseñado específicamente para estudiantes con una curva de aprendizaje mínima.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Análisis Inteligente</h4>
                <p className="text-budget-gray-600 text-sm">
                  Obtén insights automáticos sobre tus patrones de gasto y oportunidades de ahorro.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Soporte Multiidioma</h4>
                <p className="text-budget-gray-600 text-sm">
                  Disponible en español y otros idiomas para estudiantes internacionales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default TechnicalExplanation;