
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
}

interface ExpenseItemProps {
  expense: Expense;
  getCategoryName: (categoryId: string) => string;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseItem = ({ expense, getCategoryName, onEdit, onDelete }: ExpenseItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border border-budget-gray-200 rounded-lg hover:bg-budget-gray-50 transition-colors">
      <div className="flex-1">
        <h4 className="font-semibold text-primary">{expense.description}</h4>
        <div className="flex items-center space-x-4 mt-1">
          <span className="text-sm text-budget-gray-600">
            {getCategoryName(expense.categoryId)}
          </span>
          <span className="text-sm text-budget-gray-600">{expense.date}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold text-budget-danger">
          €{expense.amount.toFixed(2)}
        </span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(expense)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(expense.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
