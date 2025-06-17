
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Category } from '@/contexts/BudgetContext';

interface CategoryCardProps {
  category: Category;
}

// Emoji mapping for categories with proper Spanish names
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

  // Consistent color scheme: green for good status, red for overspending
  const statusColor = isOverBudget ? 'text-red-600' : 'text-green-600';
  const progressColor = isOverBudget ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500';
  const backgroundAccent = isOverBudget ? 'bg-red-50' : 'bg-green-50';

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-budget-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm md:text-base flex items-center space-x-2">
          <span className="text-lg md:text-xl">{emoji}</span>
          <span className="text-budget-gray-900 font-semibold leading-tight">{category.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm text-budget-gray-600 font-medium">Gastado</span>
          <span className={`text-sm md:text-base font-bold ${statusColor}`}>
            €{category.spentAmount.toFixed(2)}
          </span>
        </div>
        
        <Progress 
          value={Math.min(percentage, 100)} 
          className={`h-2 md:h-3 ${progressColor}`}
        />
        
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm text-budget-gray-600 font-medium">Presupuesto</span>
          <span className="text-sm md:text-base font-semibold text-budget-gray-900">
            €{category.budgetAmount.toFixed(2)}
          </span>
        </div>
        
        <div className={`flex justify-between items-center p-2 rounded-md ${backgroundAccent}`}>
          <span className="text-xs md:text-sm text-budget-gray-700 font-medium">
            {remaining >= 0 ? 'Disponible' : 'Excedido'}
          </span>
          <span className={`text-sm md:text-base font-bold ${statusColor}`}>
            €{Math.abs(remaining).toFixed(2)}
          </span>
        </div>
        
        <div className="text-center pt-1">
          <span className={`text-xs md:text-sm font-semibold ${statusColor}`}>
            {percentage.toFixed(1)}% utilizado
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
