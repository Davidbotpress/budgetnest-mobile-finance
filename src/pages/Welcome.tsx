
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Target, PieChart, TrendingUp } from 'lucide-react';

const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Establece tu Presupuesto',
      description: 'Define límites mensuales para diferentes categorías de gastos.',
    },
    {
      icon: PieChart,
      title: 'Registra tus Gastos',
      description: 'Añade gastos fácilmente y categorízalos para mejor control.',
    },
    {
      icon: TrendingUp,
      title: 'Analiza tus Patrones',
      description: 'Visualiza estadísticas y tendencias de tus hábitos de gasto.',
    },
  ];

  const quickActions = [
    {
      title: 'Configurar Presupuesto',
      description: 'Establece tu presupuesto mensual y objetivos de ahorro',
      action: () => navigate('/dashboard'),
      primary: true,
    },
    {
      title: 'Añadir Primer Gasto',
      description: 'Registra tu primer gasto para comenzar a usar la app',
      action: () => navigate('/expenses'),
      primary: false,
    },
    {
      title: 'Ver Dashboard',
      description: 'Explora tu panel principal y todas las funciones',
      action: () => navigate('/dashboard'),
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-budget-gray-50 to-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            ¡Bienvenido a BudgetNest, {user?.name}! 🎉
          </h1>
          <p className="text-xl text-budget-gray-600 max-w-2xl mx-auto">
            Tu cuenta ha sido creada exitosamente. Estás a punto de tomar el control total de tus finanzas personales.
          </p>
        </div>

        {/* Features Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            ¿Qué puedes hacer con BudgetNest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-budget-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            Primeros Pasos
          </h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {action.title}
                      </h3>
                      <p className="text-budget-gray-600">{action.description}</p>
                    </div>
                    <Button
                      onClick={action.action}
                      variant={action.primary ? "default" : "outline"}
                      className={action.primary ? "ml-4" : "ml-4"}
                    >
                      {action.primary ? "Empezar" : "Ver"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips for Success */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-primary">💡 Consejos para el Éxito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-budget-gray-700">Sé Consistente</h4>
                  <p className="text-budget-gray-600 text-sm">
                    Registra tus gastos diariamente para obtener una imagen precisa de tus hábitos.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-budget-gray-700">Establece Metas Realistas</h4>
                  <p className="text-budget-gray-600 text-sm">
                    Comienza con presupuestos alcanzables y ajústalos según tu experiencia.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-budget-gray-700">Revisa Regularmente</h4>
                  <p className="text-budget-gray-600 text-sm">
                    Consulta tus estadísticas semanalmente para identificar patrones y oportunidades.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
          >
            Ir al Dashboard Principal
          </Button>
          <p className="text-sm text-budget-gray-500 mt-4">
            ¿Necesitas ayuda? <a href="#" className="text-primary hover:underline">Contactar soporte</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
