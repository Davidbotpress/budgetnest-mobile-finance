
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Category } from '@/contexts/BudgetContext';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const percentage = (category.spentAmount / category.budgetAmount) * 100;
  const remaining = category.budgetAmount - category.spentAmount;
  const isOverBudget = category.spentAmount > category.budgetAmount;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center space-x-2">
          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
          <span>{category.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-budget-gray-600">Gastado</span>
            <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-budget-gray-900'}`}>
              €{category.spentAmount.toFixed(2)}
            </span>
          </div>
          
          <Progress 
            value={Math.min(percentage, 100)} 
            className={`h-2 ${isOverBudget ? '[&>div]:bg-red-500' : ''}`}
          />
          
          <div className="flex justify-between text-sm">
            <span className="text-budget-gray-600">Presupuesto</span>
            <span className="font-semibold">€{category.budgetAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-budget-gray-600">
              {remaining >= 0 ? 'Restante' : 'Excedido'}
            </span>
            <span className={`font-semibold ${remaining >= 0 ? 'text-budget-success' : 'text-red-600'}`}>
              €{Math.abs(remaining).toFixed(2)}
            </span>
          </div>
          
          <div className="text-xs text-budget-gray-500 text-center">
            {percentage.toFixed(1)}% del presupuesto
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
