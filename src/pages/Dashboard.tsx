
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-budget-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-budget-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gradient">BudgetNest</h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-budget-gray-600" />
                <span className="text-budget-gray-700">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            ¡Bienvenido, {user?.name}!
          </h2>
          <p className="text-budget-gray-600">
            Aquí puedes gestionar tu presupuesto y controlar tus gastos.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-budget-gray-200">
            <h3 className="text-lg font-semibold text-primary mb-2">Presupuesto Mensual</h3>
            <p className="text-3xl font-bold text-budget-success">€0,00</p>
            <p className="text-sm text-budget-gray-600 mt-1">Sin presupuesto configurado</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-budget-gray-200">
            <h3 className="text-lg font-semibold text-primary mb-2">Gastos del Mes</h3>
            <p className="text-3xl font-bold text-budget-danger">€0,00</p>
            <p className="text-sm text-budget-gray-600 mt-1">Sin gastos registrados</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-budget-gray-200">
            <h3 className="text-lg font-semibold text-primary mb-2">Ahorro Disponible</h3>
            <p className="text-3xl font-bold text-primary">€0,00</p>
            <p className="text-sm text-budget-gray-600 mt-1">Configura tu presupuesto</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-budget-gray-200">
          <h3 className="text-lg font-semibold text-primary mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="w-full">Añadir Gasto</Button>
            <Button variant="outline" className="w-full">Ver Estadísticas</Button>
            <Button variant="outline" className="w-full">Configurar Presupuesto</Button>
            <Button variant="outline" className="w-full">Exportar Datos</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
