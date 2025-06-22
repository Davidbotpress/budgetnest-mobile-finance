import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Edit, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import BudgetOverview from '@/components/BudgetOverview';
import BudgetEditModal from '@/components/BudgetEditModal';
import ExpensesByCategory from '@/components/ExpensesByCategory';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorBoundary, ErrorMessage } from '@/components/ui/error-boundary';
import { useState, useEffect } from 'react';
import { Loading } from '@/components/ui/loading';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    currentBudget, 
    currentMonth, 
    currentYear, 
    setCurrentMonth 
  } = useBudget();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      setCurrentMonth(months[currentIndex - 1], currentYear);
    } else {
      setCurrentMonth(months[11], currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex < 11) {
      setCurrentMonth(months[currentIndex + 1], currentYear);
    } else {
      setCurrentMonth(months[0], currentYear + 1);
    }
  };

  const handleEditBudget = () => {
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <AppLayout title="Panel Central">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading size="lg" text="Cargando panel central..." />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Panel Central">
      <div className="bg-budget-gray-50 min-h-full">
        {/* Month Navigation Header */}
        <div className="bg-white border-b border-budget-gray-200 px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="flex items-center space-x-2">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl md:text-2xl font-bold text-primary">Panel Central</h1>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2 bg-budget-gray-50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousMonth}
                  className="p-1 h-7 w-7 md:h-8 md:w-8 hover:bg-white hover:shadow-sm transition-all"
                >
                  <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <span className="text-sm md:text-lg font-semibold text-budget-gray-700 min-w-[100px] md:min-w-[120px] text-center px-2">
                  {currentMonth} {currentYear}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextMonth}
                  className="p-1 h-7 w-7 md:h-8 md:w-8 hover:bg-white hover:shadow-sm transition-all"
                >
                  <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-primary mb-2">
              ¡Bienvenido de nuevo, {user?.name}!
            </h2>
            <p className="text-sm md:text-base text-budget-gray-600">
              Gestiona tu presupuesto mensual y controla tus gastos de forma inteligente.
            </p>
          </div>

          {/* Budget Overview with Edit Button */}
          <div className="mb-6 md:mb-8">
            <ErrorBoundary fallback={<ErrorMessage message="Error al cargar el resumen del presupuesto" />}>
              <div className="relative">
                <BudgetOverview selectedMonth={currentMonth} selectedYear={currentYear} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditBudget}
                  className="absolute top-4 right-4 flex items-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Editar</span>
                </Button>
              </div>
            </ErrorBoundary>
          </div>

          {/* Expenses by Category */}
          <div className="mb-6 md:mb-8">
            <ErrorBoundary fallback={<ErrorMessage message="Error al cargar los gastos por categoría" />}>
              <ExpensesByCategory month={currentMonth} year={currentYear} />
            </ErrorBoundary>
          </div>

          {/* Quick Actions Card */}
          <div className="mb-6 md:mb-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Acciones Rápidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    onClick={() => navigate('/expenses')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    Ver Todos los Gastos
                  </Button>
                  <Button 
                    onClick={() => navigate('/statistics')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    Ver Estadísticas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Budget Edit Modal */}
        <BudgetEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          month={currentMonth}
          year={currentYear}
        />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
