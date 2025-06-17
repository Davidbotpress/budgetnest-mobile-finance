
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tecnología de Vanguardia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro presupuestador utiliza las últimas tecnologías para ofrecerte la mejor experiencia de gestión financiera.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalExplanation;
