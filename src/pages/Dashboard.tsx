import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { BarChart3, Target, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentMonth, setCurrentMonth] = useState('Diciembre');
  const [currentYear, setCurrentYear] = useState(2024);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handlePreviousMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex > 0) {
      setCurrentMonth(months[currentIndex - 1]);
    } else {
      setCurrentMonth(months[11]);
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex < 11) {
      setCurrentMonth(months[currentIndex + 1]);
    } else {
      setCurrentMonth(months[0]);
      setCurrentYear(currentYear + 1);
    }
  };

  const navigationItems = [{
    title: 'Gastos',
    description: 'Registrar y gestionar gastos',
    path: '/expenses',
    icon: BarChart3
  }, {
    title: 'Estadísticas',
    description: 'Ver análisis y tendencias',
    path: '/statistics',
    icon: BarChart3
  }, {
    title: 'Bienvenida',
    description: 'Volver a la página de bienvenida',
    path: '/welcome',
    icon: Target
  }];

  if (isLoading) {
    return (
      <AppLayout title="Panel">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading size="lg" text="Cargando dashboard..." />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Panel">
      <div className="bg-budget-gray-50 min-h-full">
        {/* Month Navigation Header */}
        <div className="bg-white border-b border-budget-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl md:text-2xl font-bold text-primary">Panel</h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousMonth}
                  className="p-1 h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium text-budget-gray-700 min-w-[120px] text-center">
                  {currentMonth} {currentYear}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextMonth}
                  className="p-1 h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

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
            <ErrorBoundary fallback={<ErrorMessage message="Error al cargar el resumen del presupuesto" />}>
              <BudgetOverview />
            </ErrorBoundary>
          </div>

          {/* Category Cards */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">
              Categorías de Gastos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {currentBudget?.categories?.map(category => (
                <ErrorBoundary key={category.id} fallback={
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <p className="text-sm text-red-600">Error al cargar categoría</p>
                  </div>
                }>
                  <CategoryCard category={category} />
                </ErrorBoundary>
              )) || (
                <div className="col-span-full">
                  <ErrorMessage message="No hay categorías disponibles" />
                </div>
              )}
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
