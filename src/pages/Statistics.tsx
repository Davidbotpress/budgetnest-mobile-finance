
import { useBudget } from '@/contexts/BudgetContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatisticsHeader from '@/components/statistics/StatisticsHeader';
import MetricsCards from '@/components/statistics/MetricsCards';
import TrendsChart from '@/components/statistics/TrendsChart';
import CategoriesChart from '@/components/statistics/CategoriesChart';
import OverspendingSection from '@/components/statistics/OverspendingSection';

const Statistics = () => {
  const { currentBudget } = useBudget();

  // Monthly spending data for the last 6 months
  const monthlyData = [
    { month: 'Jul', gastos: 450, presupuesto: 2000 },
    { month: 'Ago', gastos: 520, presupuesto: 2000 },
    { month: 'Sep', gastos: 380, presupuesto: 2000 },
    { month: 'Oct', gastos: 610, presupuesto: 2000 },
    { month: 'Nov', gastos: 490, presupuesto: 2000 },
    { month: 'Dic', gastos: 1375, presupuesto: 2000 },
  ];

  // Calculate overspending categories
  const overspendingCategories = currentBudget.categories.filter(
    category => category.spentAmount > category.budgetAmount
  );

  // Calculate totals
  const totalSpent = currentBudget.categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const totalBudget = currentBudget.totalBudget;
  const totalLastMonth = monthlyData[monthlyData.length - 2]?.gastos || 0;
  const percentageChange = totalLastMonth > 0 ? ((totalSpent - totalLastMonth) / totalLastMonth) * 100 : 0;

  return (
    <div className="min-h-screen bg-budget-gray-50">
      <StatisticsHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Estadísticas</h2>
          <p className="text-budget-gray-600">
            Analiza tus patrones de gasto y controla tu presupuesto con gráficos interactivos.
          </p>
        </div>

        <MetricsCards
          totalSpent={totalSpent}
          totalBudget={totalBudget}
          percentageChange={percentageChange}
          overspendingCount={overspendingCategories.length}
          totalCategories={currentBudget.categories.length}
        />

        {/* Charts Section */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="overspending">Excesos</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <TrendsChart />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoriesChart categories={currentBudget.categories} />
          </TabsContent>

          <TabsContent value="overspending" className="space-y-6">
            <OverspendingSection overspendingCategories={overspendingCategories} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Statistics;
