
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useBudget } from '@/contexts/BudgetContext';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const BudgetOverview = () => {
  const { currentBudget } = useBudget();
  
  const totalSpent = currentBudget.categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const totalRemaining = currentBudget.totalBudget - totalSpent;
  const spentPercentage = (totalSpent / currentBudget.totalBudget) * 100;
  const isOverBudget = totalSpent > currentBudget.totalBudget;

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-primary" />
          <span>Resumen Presupuesto - {currentBudget.month} {currentBudget.year}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-budget-gray-600 mb-1">Presupuesto Total</p>
            <p className="text-3xl font-bold text-primary">€{currentBudget.totalBudget.toFixed(2)}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-budget-gray-600 mb-1">Total Gastado</p>
            <p className={`text-3xl font-bold ${isOverBudget ? 'text-red-600' : 'text-budget-danger'}`}>
              €{totalSpent.toFixed(2)}
            </p>
            <div className="flex items-center justify-center mt-1">
              {isOverBudget ? (
                <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-budget-success mr-1" />
              )}
              <span className="text-xs text-budget-gray-500">
                {spentPercentage.toFixed(1)}% del presupuesto
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-budget-gray-600 mb-1">
              {totalRemaining >= 0 ? 'Disponible' : 'Excedido'}
            </p>
            <p className={`text-3xl font-bold ${totalRemaining >= 0 ? 'text-budget-success' : 'text-red-600'}`}>
              €{Math.abs(totalRemaining).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progreso del Mes</span>
            <span>{spentPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={Math.min(spentPercentage, 100)} 
            className={`h-3 ${isOverBudget ? '[&>div]:bg-red-500' : ''}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
