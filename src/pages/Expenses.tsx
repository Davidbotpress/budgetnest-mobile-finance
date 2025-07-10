import { useState } from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/AppLayout';
import ExpensesSummaryCard from '@/components/ExpensesSummaryCard';
import ExpenseFilters from '@/components/ExpenseFilters';
import ExpenseForm from '@/components/ExpenseForm';
import ExpensesList from '@/components/ExpensesList';

interface Expense {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
}

const Expenses = () => {
  const { currentBudget, addExpenseToCategory } = useBudget();
  const { toast } = useToast();
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    categoryId: currentBudget.categories[0]?.id || '',
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount) {
      const amount = parseFloat(newExpense.amount);
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: amount,
        categoryId: newExpense.categoryId,
        date: new Date().toLocaleDateString('es-ES'),
      };
      
      setExpenses([expense, ...expenses]);
      addExpenseToCategory(newExpense.categoryId, amount, newExpense.description, new Date().toISOString());
      
      const categoryName = currentBudget.categories.find(cat => cat.id === newExpense.categoryId)?.name;
      toast({
        title: "Gasto añadido",
        description: `€${amount.toFixed(2)} añadido a ${categoryName}`,
      });
      
      setNewExpense({ description: '', amount: '', categoryId: currentBudget.categories[0]?.id || '' });
      setShowAddForm(false);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setNewExpense({
      description: expense.description,
      amount: expense.amount.toString(),
      categoryId: expense.categoryId,
    });
    setShowAddForm(true);
  };

  const handleUpdateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense && newExpense.description && newExpense.amount) {
      const amount = parseFloat(newExpense.amount);
      const updatedExpense: Expense = {
        ...editingExpense,
        description: newExpense.description,
        amount: amount,
        categoryId: newExpense.categoryId,
      };
      
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? updatedExpense : exp));
      
      toast({
        title: "Gasto actualizado",
        description: "El gasto ha sido actualizado correctamente",
      });
      
      setNewExpense({ description: '', amount: '', categoryId: currentBudget.categories[0]?.id || '' });
      setEditingExpense(null);
      setShowAddForm(false);
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: "Gasto eliminado",
      description: "El gasto ha sido eliminado correctamente",
    });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setNewExpense({ description: '', amount: '', categoryId: currentBudget.categories[0]?.id || '' });
    setShowAddForm(false);
  };

  // Filter expenses based on search term and selected category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || expense.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    return currentBudget.categories.find(cat => cat.id === categoryId)?.name || 'Sin categoría';
  };

  return (
    <AppLayout title="Registro de Gastos">
      <div className="bg-budget-gray-50 min-h-full">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Registro de Gastos</h2>
            <p className="text-budget-gray-600">
              Registra y gestiona todos tus gastos en un solo lugar.
            </p>
          </div>

          {/* Summary Card */}
          <ExpensesSummaryCard expenses={expenses} />

          {/* Search and Filter Controls */}
          <ExpenseFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={currentBudget.categories}
          />

          {/* Add Expense Button */}
          <div className="mb-6">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Añadir Gasto</span>
            </Button>
          </div>

          {/* Add/Edit Expense Form */}
          {showAddForm && (
            <ExpenseForm
              editingExpense={editingExpense}
              newExpense={newExpense}
              setNewExpense={setNewExpense}
              categories={currentBudget.categories}
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Expenses List */}
          <ExpensesList
            expenses={expenses}
            filteredExpenses={filteredExpenses}
            getCategoryName={getCategoryName}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Expenses;
