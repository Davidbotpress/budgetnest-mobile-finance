
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Expense {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
}

interface ExpensesSummaryCardProps {
  expenses: Expense[];
}

const ExpensesSummaryCard = ({ expenses }: ExpensesSummaryCardProps) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-primary">Resumen de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-budget-gray-600">Total Gastado</p>
            <p className="text-2xl font-bold text-budget-danger">€{totalExpenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-budget-gray-600">Número de Gastos</p>
            <p className="text-2xl font-bold text-primary">{expenses.length}</p>
          </div>
          <div>
            <p className="text-sm text-budget-gray-600">Promedio por Gasto</p>
            <p className="text-2xl font-bold text-budget-gray-700">
              €{expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesSummaryCard;
