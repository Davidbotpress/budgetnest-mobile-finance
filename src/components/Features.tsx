
import FeatureCard from './FeatureCard';
import { CircleDollarSign, FileText, Settings, User } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: CircleDollarSign,
      title: "Seguimiento Inteligente",
      description: "Establece presupuestos mensuales por categoría y sigue tus gastos en tiempo real con indicadores visuales de progreso.",
      delay: "0s"
    },
    {
      icon: FileText,
      title: "Registro de Gastos",
      description: "Registra gastos rápidamente con nuestra interfaz intuitiva. Edita, elimina y categoriza transacciones sin esfuerzo.",
      delay: "0.1s"
    },
    {
      icon: Settings,
      title: "Análisis Detallado",
      description: "Obtén insights sobre tus patrones de gasto con gráficos hermosos e identifica áreas de mejora.",
      delay: "0.2s"
    },
    {
      icon: User,
      title: "Enfoque Estudiantil",
      description: "Diseñado específicamente para estudiantes internacionales y jóvenes profesionales que manejan asignaciones mensuales.",
      delay: "0.3s"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-budget-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Todo lo que Necesitas para
            <span className="text-gradient block">Gestionar tu Presupuesto</span>
          </h2>
          <p className="text-xl text-budget-gray-600 max-w-2xl mx-auto">
            BudgetNest proporciona todas las herramientas que necesitas para tomar control de tus finanzas y construir hábitos de gasto saludables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
