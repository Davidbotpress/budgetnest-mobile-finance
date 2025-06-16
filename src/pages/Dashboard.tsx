
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { BarChart3, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import BudgetOverview from '@/components/BudgetOverview';
import CategoryCard from '@/components/CategoryCard';
import QuickAddExpense from '@/components/QuickAddExpense';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorBoundary, ErrorMessage } from '@/components/ui/error-boundary';
import { useState, useEffect } from 'react';
import { Loading } from '@/components/ui/loading';

const Dashboard = () => {
  const { user } = useAuth();
  const { currentBudget } = useBudget();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const navigationItems = [
    {
      title: 'Gastos',
      description: 'Registrar y gestionar gastos',
      path: '/expenses',
      icon: BarChart3,
    },
    {
      title: 'Estadísticas',
      description: 'Ver análisis y tendencias',
      path: '/statistics',
      icon: BarChart3,
    },
    {
      title: 'Bienvenida',
      description: 'Volver a la página de bienvenida',
      path: '/welcome',
      icon: Target,
    },
  ];

  if (isLoading) {
    return (
      <AppLayout title="Dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading size="lg" text="Cargando dashboard..." />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard">
      <div className="bg-budget-gray-50 min-h-full">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              ¡Bienvenido, {user?.name}!
            </h2>
            <p className="text-sm md:text-base text-budget-gray-600">
              Aquí puedes gestionar tu presupuesto y controlar tus gastos.
            </p>
          </div>

          {/* Budget Overview */}
          <div className="mb-6 md:mb-8">
            <ErrorBoundary fallback={
              <ErrorMessage message="Error al cargar el resumen del presupuesto" />
            }>
              <BudgetOverview />
            </ErrorBoundary>
          </div>

          {/* Category Cards */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">
              Categorías de Gastos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {currentBudget?.categories?.map((category) => (
                <ErrorBoundary 
                  key={category.id}
                  fallback={
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <p className="text-sm text-red-600">Error al cargar categoría</p>
                    </div>
                  }
                >
                  <CategoryCard category={category} />
                </ErrorBoundary>
              )) || (
                <div className="col-span-full">
                  <ErrorMessage message="No hay categorías disponibles" />
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-budget-gray-200 mb-6 md:mb-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
              <Button 
                onClick={() => navigate('/expenses')} 
                className="w-full text-sm md:text-base"
              >
                Gestionar Gastos
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-sm md:text-base" 
                onClick={() => navigate('/statistics')}
              >
                Ver Estadísticas
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-sm md:text-base"
              >
                Configurar Presupuesto
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-sm md:text-base"
              >
                Exportar Datos
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Add Expense Button */}
        <ErrorBoundary fallback={null}>
          <QuickAddExpense />
        </ErrorBoundary>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
