
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Plus, BarChart3, PieChart, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationItems = [
    {
      title: 'Gastos',
      description: 'Registrar y gestionar gastos',
      path: '/expenses',
      icon: Plus,
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

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-budget-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button className="py-4 px-2 border-b-2 border-primary text-primary font-medium">
              Dashboard
            </button>
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="py-4 px-2 border-b-2 border-transparent text-budget-gray-600 hover:text-primary hover:border-primary transition-colors font-medium"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

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
        <div className="bg-white rounded-lg shadow-sm p-6 border border-budget-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-primary mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button onClick={() => navigate('/expenses')} className="w-full">
              Añadir Gasto
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

        {/* Page Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-budget-gray-200">
          <h3 className="text-lg font-semibold text-primary mb-4">Navegar a Otras Páginas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {navigationItems.map((item) => (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className="p-4 border border-budget-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold text-primary">{item.title}</h4>
                </div>
                <p className="text-sm text-budget-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
