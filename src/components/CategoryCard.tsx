
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Category } from '@/contexts/BudgetContext';

interface CategoryCardProps {
  category: Category;
}

// Emoji mapping for categories
const categoryEmojis: Record<string, string> = {
  'vivienda': '🏠',
  'alimentacion': '🍔',
  'transporte': '🚗',
  'ocio': '🎉',
  'deportes': '🏃',
  'cuidado': '💄',
  'educacion': '📚',
  'personal': '👤',
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const percentage = (category.spentAmount / category.budgetAmount) * 100;
  const remaining = category.budgetAmount - category.spentAmount;
  const isOverBudget = category.spentAmount > category.budgetAmount;
  const emoji = categoryEmojis[category.id] || '📁';

  // Color scheme: green for good status, red for overspending
  const statusColor = isOverBudget ? 'text-red-600' : 'text-green-600';
  const progressColor = isOverBudget ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500';

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center space-x-2">
          <span className="text-lg">{emoji}</span>
          <span className="text-budget-gray-900">{category.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-budget-gray-600">Gastado</span>
          <span className={`text-sm font-semibold ${statusColor}`}>
            €{category.spentAmount.toFixed(2)}
          </span>
        </div>
        
        <Progress 
          value={Math.min(percentage, 100)} 
          className={`h-2 ${progressColor}`}
        />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-budget-gray-600">Presupuesto</span>
          <span className="text-sm font-medium text-budget-gray-900">
            €{category.budgetAmount.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-budget-gray-600">
            {remaining >= 0 ? 'Restante' : 'Excedido'}
          </span>
          <span className={`text-sm font-semibold ${statusColor}`}>
            €{Math.abs(remaining).toFixed(2)}
          </span>
        </div>
        
        <div className="text-center pt-1">
          <span className={`text-xs font-medium ${statusColor}`}>
            {percentage.toFixed(1)}% del presupuesto
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
