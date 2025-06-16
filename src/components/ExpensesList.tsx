
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseItem from './ExpenseItem';

interface Expense {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
}

interface ExpensesListProps {
  expenses: Expense[];
  filteredExpenses: Expense[];
  getCategoryName: (categoryId: string) => string;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpensesList = ({
  expenses,
  filteredExpenses,
  getCategoryName,
  onEditExpense,
  onDeleteExpense
}: ExpensesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Gastos</CardTitle>
        {filteredExpenses.length !== expenses.length && (
          <p className="text-sm text-budget-gray-600">
            Mostrando {filteredExpenses.length} de {expenses.length} gastos
          </p>
        )}
      </CardHeader>
      <CardContent>
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-budget-gray-600">
              {expenses.length === 0 
                ? 'No hay gastos registrados aún.' 
                : 'No se encontraron gastos que coincidan con los filtros.'
              }
            </p>
            <p className="text-sm text-budget-gray-500 mt-2">
              {expenses.length === 0 
                ? 'Añade tu primer gasto usando el botón de arriba.'
                : 'Intenta ajustar los filtros de búsqueda.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                getCategoryName={getCategoryName}
                onEdit={onEditExpense}
                onDelete={onDeleteExpense}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
