
import { useBudget } from '@/contexts/BudgetContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppLayout } from '@/components/layout/AppLayout';
import MetricsCards from '@/components/statistics/MetricsCards';
import TrendsChart from '@/components/statistics/TrendsChart';
import CategoriesChart from '@/components/statistics/CategoriesChart';
import OverspendingSection from '@/components/statistics/OverspendingSection';
import { Loading, LoadingCard } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-boundary';
import { useState, useEffect } from 'react';

const Statistics = () => {
  const { currentBudget } = useBudget();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Monthly spending data for the last 6 months
  const monthlyData = [
    { month: 'Jul', gastos: 450, presupuesto: 2000 },
    { month: 'Ago', gastos: 520, presupuesto: 2000 },
    { month: 'Sep', gastos: 380, presupuesto: 2000 },
    { month: 'Oct', gastos: 610, presupuesto: 2000 },
    { month: 'Nov', gastos: 490, presupuesto: 2000 },
    { month: 'Dic', gastos: 1375, presupuesto: 2000 },
  ];

  useEffect(() => {
    // Simulate loading time for statistics calculation
    const timer = setTimeout(() => {
      try {
        if (!currentBudget || !currentBudget.categories) {
          setError('No hay datos de presupuesto disponibles');
        } else {
          setError(null);
        }
      } catch (err) {
        setError('Error al cargar las estadísticas');
      } finally {
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentBudget]);

  // Calculate overspending categories
  const overspendingCategories = currentBudget?.categories?.filter(
    category => category.spentAmount > category.budgetAmount
  ) || [];

  // Calculate totals
  const totalSpent = currentBudget?.categories?.reduce((sum, cat) => sum + cat.spentAmount, 0) || 0;
  const totalBudget = currentBudget?.totalBudget || 0;
  const totalLastMonth = monthlyData[monthlyData.length - 2]?.gastos || 0;
  const percentageChange = totalLastMonth > 0 ? ((totalSpent - totalLastMonth) / totalLastMonth) * 100 : 0;

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    // Trigger re-load
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  if (error) {
    return (
      <AppLayout title="Estadísticas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage 
            title="Error al cargar estadísticas"
            message={error}
            onRetry={handleRetry}
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Estadísticas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Estadísticas</h2>
          <p className="text-sm md:text-base text-budget-gray-600">
            Analiza tus patrones de gasto y controla tu presupuesto con gráficos interactivos.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
            <div className="flex justify-center py-8">
              <Loading size="lg" text="Calculando estadísticas..." />
            </div>
          </div>
        ) : (
          <>
            <MetricsCards
              totalSpent={totalSpent}
              totalBudget={totalBudget}
              percentageChange={percentageChange}
              overspendingCount={overspendingCategories.length}
              totalCategories={currentBudget?.categories?.length || 0}
            />

            {/* Charts Section */}
            <Tabs defaultValue="trends" className="space-y-4 md:space-y-6">
              <TabsList className="grid w-full grid-cols-3 h-auto p-1">
                <TabsTrigger value="trends" className="text-xs md:text-sm py-2 md:py-3">
                  Tendencias
                </TabsTrigger>
                <TabsTrigger value="categories" className="text-xs md:text-sm py-2 md:py-3">
                  Categorías
                </TabsTrigger>
                <TabsTrigger value="overspending" className="text-xs md:text-sm py-2 md:py-3">
                  Excesos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trends" className="space-y-4 md:space-y-6">
                <TrendsChart />
              </TabsContent>

              <TabsContent value="categories" className="space-y-4 md:space-y-6">
                <CategoriesChart categories={currentBudget?.categories || []} />
              </TabsContent>

              <TabsContent value="overspending" className="space-y-4 md:space-y-6">
                <OverspendingSection overspendingCategories={overspendingCategories} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Statistics;
