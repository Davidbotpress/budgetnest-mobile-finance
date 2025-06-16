
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

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

        {/* Search and Filter Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Buscar gastos</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-budget-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Buscar por descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="categoryFilter">Filtrar por categoría</Label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-budget-gray-400 h-4 w-4" />
                  <select
                    id="categoryFilter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Todas las categorías</option>
                    {currentBudget.categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Input
                      id="description"
                      type="text"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      placeholder="Ej: Almuerzo en restaurante"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Cantidad (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      placeholder="15.50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <select
                    id="category"
                    value={newExpense.categoryId}
                    onChange={(e) => setNewExpense({ ...newExpense, categoryId: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {currentBudget.categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingExpense ? 'Actualizar Gasto' : 'Guardar Gasto'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Expenses List */}
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
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border border-budget-gray-200 rounded-lg hover:bg-budget-gray-50 transition-colors"
                  >
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
                          onClick={() => handleEditExpense(expense)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Expenses;
