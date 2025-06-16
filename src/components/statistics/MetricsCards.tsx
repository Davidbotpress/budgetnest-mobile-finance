
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, PieChart, AlertTriangle } from 'lucide-react';
import { Category } from '@/contexts/BudgetContext';

interface MetricsCardsProps {
  totalSpent: number;
  totalBudget: number;
  percentageChange: number;
  overspendingCount: number;
  totalCategories: number;
}

const MetricsCards = ({ 
  totalSpent, 
  totalBudget, 
  percentageChange, 
  overspendingCount, 
  totalCategories 
}: MetricsCardsProps) => {
  return (
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
          <div className="text-2xl font-bold text-budget-danger">{overspendingCount}</div>
          <p className="text-xs text-budget-gray-600 mt-1">
            de {totalCategories} categorías
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
