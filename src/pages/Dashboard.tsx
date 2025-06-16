
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { BarChart3, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import BudgetOverview from '@/components/BudgetOverview';
import CategoryCard from '@/components/CategoryCard';
import QuickAddExpense from '@/components/QuickAddExpense';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { currentBudget } = useBudget();
  const navigate = useNavigate();

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

  return (
    <AppLayout title="Dashboard">
      <div className="bg-budget-gray-50 min-h-full">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              ¡Bienvenido, {user?.name}!
            </h2>
            <p className="text-budget-gray-600">
              Aquí puedes gestionar tu presupuesto y controlar tus gastos.
            </p>
          </div>

          {/* Budget Overview */}
          <div className="mb-8">
            <BudgetOverview />
          </div>

          {/* Category Cards */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary mb-4">Categorías de Gastos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentBudget.categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-budget-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button onClick={() => navigate('/expenses')} className="w-full">
                Gestionar Gastos
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/statistics')}>
                Ver Estadísticas
              </Button>
              <Button variant="outline" className="w-full">
                Configurar Presupuesto
              </Button>
              <Button variant="outline" className="w-full">
                Exportar Datos
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Add Expense Button */}
        <QuickAddExpense />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
