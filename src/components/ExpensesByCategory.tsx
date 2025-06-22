import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBudget } from '@/contexts/BudgetContext';

interface ExpensesByCategoryProps {
  month: string;
  year: number;
}

const ExpensesByCategory = ({ month, year }: ExpensesByCategoryProps) => {
  const { currentBudget } = useBudget();
  
  // Group expenses by category
  const expensesByCategory = currentBudget.categories.map(category => {
    const categoryExpenses = currentBudget.expenses.filter(
      expense => expense.categoryId === category.id
    );
    
    const totalSpent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = currentBudget.totalBudget > 0 ? (totalSpent / currentBudget.totalBudget) * 100 : 0;
    
    return {
      ...category,
      expenses: categoryExpenses,
      totalSpent,
      percentage,
    };
  }).filter(category => category.expenses.length > 0); // Only show categories with expenses

  if (expensesByCategory.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-budget-gray-500">No hay gastos registrados para {month} {year}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Gastos por Categoría</h3>
      {expensesByCategory.map(category => (
        <Card key={category.id} className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span>{category.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.expenses.length} gastos
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-budget-gray-600">Total gastado:</span>
              <span className="font-semibold text-red-600">€{category.totalSpent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-budget-gray-600">Porcentaje del presupuesto:</span>
              <span className="font-semibold text-primary">{category.percentage.toFixed(1)}%</span>
            </div>
            
            {/* List of expenses */}
            <div className="mt-3 space-y-2">
              <h4 className="text-sm font-medium text-budget-gray-700">Gastos individuales:</h4>
              {category.expenses.map(expense => (
                <div key={expense.id} className="flex justify-between items-center py-1 px-2 bg-budget-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{expense.description}</p>
                    <p className="text-xs text-budget-gray-500">
                      {new Date(expense.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-red-600">€{expense.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExpensesByCategory; 