
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
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
  const { user, logout } = useAuth();
  const { currentBudget, addExpenseToCategory } = useBudget();
  const { toast } = useToast();
  const navigate = useNavigate();
  
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
      addExpenseToCategory(newExpense.categoryId, amount);
      
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
    <div className="min-h-screen bg-budget-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-budget-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gradient cursor-pointer" onClick={() => navigate('/dashboard')}>
              BudgetNest
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-budget-gray-600" />
                <span className="text-budget-gray-700">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </main>
    </div>
  );
};

export default Expenses;
