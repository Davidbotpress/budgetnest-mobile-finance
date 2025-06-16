import { useAuth } from '@/contexts/AuthContext';
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, TrendingUp, PieChart, BarChart3, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Statistics = () => {
  const { user, logout } = useAuth();
  const { currentBudget } = useBudget();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Monthly spending data for the last 6 months
  const monthlyData = [
    { month: 'Jul', gastos: 450, presupuesto: 2000 },
    { month: 'Ago', gastos: 520, presupuesto: 2000 },
    { month: 'Sep', gastos: 380, presupuesto: 2000 },
    { month: 'Oct', gastos: 610, presupuesto: 2000 },
    { month: 'Nov', gastos: 490, presupuesto: 2000 },
    { month: 'Dic', gastos: 1375, presupuesto: 2000 },
  ];

  // Category data from budget context
  const categoryData = currentBudget.categories.map((category, index) => ({
    name: category.name,
    value: category.spentAmount,
    budget: category.budgetAmount,
    fill: [
      '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', 
      '#ef4444', '#ec4899', '#6366f1', '#f97316'
    ][index % 8],
    percentage: Math.round((category.spentAmount / category.budgetAmount) * 100),
  }));

  // Calculate overspending categories
  const overspendingCategories = currentBudget.categories.filter(
    category => category.spentAmount > category.budgetAmount
  );

  // Calculate totals
  const totalSpent = currentBudget.categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const totalBudget = currentBudget.totalBudget;
  const totalLastMonth = monthlyData[monthlyData.length - 2]?.gastos || 0;
  const percentageChange = totalLastMonth > 0 ? ((totalSpent - totalLastMonth) / totalLastMonth) * 100 : 0;

  // Chart configurations
  const chartConfig = {
    gastos: {
      label: "Gastos",
      color: "#3b82f6",
    },
    presupuesto: {
      label: "Presupuesto",
      color: "#e5e7eb",
    },
  };

  const categoryChartConfig = categoryData.reduce((config, category, index) => {
    config[category.name.toLowerCase().replace(/\s+/g, '')] = {
      label: category.name,
      color: category.fill,
    };
    return config;
  }, {} as any);

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
            Analiza tus patrones de gasto y controla tu presupuesto con gráficos interactivos.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-budget-gray-600">
                Gastos Este Mes
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">€{totalSpent.toFixed(2)}</div>
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
              <div className="text-2xl font-bold text-primary">€{(totalSpent / 30).toFixed(2)}</div>
              <p className="text-xs text-budget-gray-600 mt-1">
                Basado en gastos del mes actual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-budget-gray-600">
                Restante del Presupuesto
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalBudget - totalSpent >= 0 ? 'text-budget-success' : 'text-budget-danger'}`}>
                €{(totalBudget - totalSpent).toFixed(2)}
              </div>
              <p className="text-xs text-budget-gray-600 mt-1">
                {Math.round(((totalBudget - totalSpent) / totalBudget) * 100)}% del presupuesto
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-budget-gray-600">
                Categorías Excedidas
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-budget-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-budget-danger">{overspendingCategories.length}</div>
              <p className="text-xs text-budget-gray-600 mt-1">
                de {currentBudget.categories.length} categorías
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="overspending">Excesos</TabsTrigger>
          </TabsList>

          {/* Monthly Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Tendencia de Gastos Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="gastos" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Gastos (€)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="presupuesto" 
                        stroke="#e5e7eb" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Presupuesto (€)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Comparación Gastos vs Presupuesto</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="presupuesto" fill="#e5e7eb" name="Presupuesto (€)" />
                      <Bar dataKey="gastos" fill="#3b82f6" name="Gastos (€)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Distribución por Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={categoryChartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-2 border rounded shadow">
                                  <p className="font-semibold">{data.name}</p>
                                  <p>Gastado: €{data.value.toFixed(2)}</p>
                                  <p>Presupuesto: €{data.budget.toFixed(2)}</p>
                                  <p>Porcentaje: {data.percentage}%</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Progreso por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-budget-gray-700">
                            {category.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${category.percentage > 100 ? 'text-budget-danger' : 'text-budget-gray-600'}`}>
                              {category.percentage}%
                            </span>
                            <span className="text-sm font-bold text-primary">
                              €{category.value.toFixed(2)} / €{category.budget.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-budget-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              category.percentage > 100 ? 'bg-budget-danger' :
                              category.percentage > 80 ? 'bg-budget-warning' : 'bg-budget-success'
                            }`}
                            style={{ width: `${Math.min(category.percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Overspending Tab */}
          <TabsContent value="overspending" className="space-y-6">
            {overspendingCategories.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-budget-danger flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Categorías con Exceso de Gasto</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {overspendingCategories.map((category) => (
                        <div key={category.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-red-800">{category.name}</h4>
                            <span className="text-red-600 font-bold">
                              +€{(category.spentAmount - category.budgetAmount).toFixed(2)}
                            </span>
                          </div>
                          <div className="text-sm text-red-700">
                            <p>Gastado: €{category.spentAmount.toFixed(2)}</p>
                            <p>Presupuesto: €{category.budgetAmount.toFixed(2)}</p>
                            <p>Exceso: {Math.round(((category.spentAmount - category.budgetAmount) / category.budgetAmount) * 100)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">Recomendaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos para Reducir Gastos</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Revisa los gastos recurrentes en las categorías excedidas</li>
                          <li>• Considera establecer límites diarios para estas categorías</li>
                          <li>• Busca alternativas más económicas</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Ajustar Presupuesto</h4>
                        <p className="text-yellow-700 text-sm">
                          Si estos excesos son regulares, considera ajustar tu presupuesto mensual 
                          redistribuyendo fondos entre categorías.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <div className="text-budget-success mb-4">
                    <TrendingUp className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-budget-success mb-2">
                    ¡Excelente Control!
                  </h3>
                  <p className="text-budget-gray-600">
                    No tienes categorías con exceso de gasto este mes. 
                    Mantén este buen ritmo de control financiero.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Statistics;
