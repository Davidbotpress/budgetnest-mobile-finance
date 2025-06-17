
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useBudget } from '@/contexts/BudgetContext';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface BudgetOverviewProps {
  selectedMonth?: string;
  selectedYear?: number;
}

const BudgetOverview = ({ selectedMonth, selectedYear }: BudgetOverviewProps) => {
  const { currentBudget } = useBudget();
  
  const totalSpent = currentBudget.categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const totalRemaining = currentBudget.totalBudget - totalSpent;
  const spentPercentage = (totalSpent / currentBudget.totalBudget) * 100;
  const isOverBudget = totalSpent > currentBudget.totalBudget;

  // Use the selected month/year if provided, otherwise fall back to currentBudget values
  const displayMonth = selectedMonth || currentBudget.month;
  const displayYear = selectedYear || currentBudget.year;

  // Consistent color scheme: green for good status, red for overspending
  const spentColor = isOverBudget ? 'text-red-600' : 'text-green-600';
  const remainingColor = totalRemaining >= 0 ? 'text-green-600' : 'text-red-600';
  const progressColor = isOverBudget ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500';
  const trendIconColor = isOverBudget ? 'text-red-600' : 'text-green-600';

  return (
    <Card className="col-span-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
          <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          <span className="text-primary">Resumen del Presupuesto - {displayMonth} {displayYear}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center p-4 bg-budget-gray-50 rounded-lg">
            <p className="text-xs md:text-sm text-budget-gray-600 mb-2 font-medium">Presupuesto Total</p>
            <p className="text-2xl md:text-3xl font-bold text-primary">€{currentBudget.totalBudget.toFixed(2)}</p>
          </div>
          
          <div className="text-center p-4 bg-budget-gray-50 rounded-lg">
            <p className="text-xs md:text-sm text-budget-gray-600 mb-2 font-medium">Total Gastado</p>
            <p className={`text-2xl md:text-3xl font-bold ${spentColor}`}>
              €{totalSpent.toFixed(2)}
            </p>
            <div className="flex items-center justify-center mt-2">
              {isOverBudget ? (
                <TrendingUp className={`h-3 w-3 md:h-4 md:w-4 ${trendIconColor} mr-1`} />
              ) : (
                <TrendingDown className={`h-3 w-3 md:h-4 md:w-4 ${trendIconColor} mr-1`} />
              )}
              <span className={`text-xs text-budget-gray-500 font-medium`}>
                {spentPercentage.toFixed(1)}% del presupuesto
              </span>
            </div>
          </div>
          
          <div className="text-center p-4 bg-budget-gray-50 rounded-lg">
            <p className="text-xs md:text-sm text-budget-gray-600 mb-2 font-medium">
              {totalRemaining >= 0 ? 'Disponible' : 'Excedido'}
            </p>
            <p className={`text-2xl md:text-3xl font-bold ${remainingColor}`}>
              €{Math.abs(totalRemaining).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 px-2">
          <div className="flex justify-between text-sm md:text-base">
            <span className="font-medium text-budget-gray-700">Progreso del Mes</span>
            <span className={`font-bold ${spentColor}`}>{spentPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={Math.min(spentPercentage, 100)} 
            className={`h-3 md:h-4 ${progressColor}`}
          />
          {isOverBudget && (
            <p className="text-xs md:text-sm text-red-600 text-center font-medium">
              Has excedido tu presupuesto mensual
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
