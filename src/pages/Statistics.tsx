
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for statistics
  const monthlyData = [
    { month: 'Enero', gastos: 450 },
    { month: 'Febrero', gastos: 520 },
    { month: 'Marzo', gastos: 380 },
    { month: 'Abril', gastos: 610 },
    { month: 'Mayo', gastos: 490 },
    { month: 'Junio', gastos: 340 },
  ];

  const categoryData = [
    { category: 'Alimentación', amount: 245, percentage: 40 },
    { category: 'Transporte', amount: 150, percentage: 25 },
    { category: 'Entretenimiento', amount: 90, percentage: 15 },
    { category: 'Salud', amount: 75, percentage: 12 },
    { category: 'Otros', amount: 50, percentage: 8 },
  ];

  const totalThisMonth = 610;
  const totalLastMonth = 490;
  const percentageChange = ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;

  return (
    <div className="min-h-screen bg-budget-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-budget-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gradient cursor-pointer" onClick={() => navigate('/dashboard')}>
              BudgetNest
            </h1>
            
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
          <h2 className="text-3xl font-bold text-primary mb-2">Estadísticas</h2>
          <p className="text-budget-gray-600">
            Analiza tus patrones de gasto y controla tu presupuesto.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-budget-gray-600">
                Gastos Este Mes
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">€{totalThisMonth}</div>
              <p className={`text-xs mt-1 ${percentageChange > 0 ? 'text-budget-danger' : 'text-budget-success'}`}>
                {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-budget-gray-600">
                Promedio Diario
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">€{(totalThisMonth / 30).toFixed(2)}</div>
              <p className="text-xs text-budget-gray-600 mt-1">
                Basado en gastos del mes actual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-budget-gray-600">
                Categoría Principal
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Alimentación</div>
              <p className="text-xs text-budget-gray-600 mt-1">
                €{categoryData[0].amount} (40% del total)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Tendencia Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-budget-gray-700">{data.month}</span>
                  <div className="flex items-center space-x-4 flex-1 mx-4">
                    <div className="w-full bg-budget-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(data.gastos / Math.max(...monthlyData.map(d => d.gastos))) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-primary min-w-16">€{data.gastos}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-budget-gray-700">
                      {category.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-budget-gray-600">{category.percentage}%</span>
                      <span className="text-sm font-bold text-primary">€{category.amount}</span>
                    </div>
                  </div>
                  <div className="w-full bg-budget-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-primary' :
                        index === 1 ? 'bg-budget-success' :
                        index === 2 ? 'bg-budget-warning' :
                        index === 3 ? 'bg-budget-danger' : 'bg-budget-gray-400'
                      }`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-primary">Insights y Recomendaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Consejo del Mes</h4>
                <p className="text-blue-700 text-sm">
                  Tus gastos en alimentación representan el 40% de tu presupuesto. Considera cocinar más en casa para reducir estos gastos.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ Buen Trabajo</h4>
                <p className="text-green-700 text-sm">
                  Has mantenido tus gastos de transporte bajo control este mes, solo el 25% de tu presupuesto.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Atención</h4>
                <p className="text-yellow-700 text-sm">
                  Tus gastos han aumentado un {percentageChange.toFixed(1)}% comparado con el mes pasado. Revisa tu presupuesto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Statistics;
