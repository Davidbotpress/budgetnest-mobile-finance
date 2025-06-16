
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Expenses = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Alimentación',
  });

  const categories = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Otros'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toLocaleDateString('es-ES'),
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({ description: '', amount: '', category: 'Alimentación' });
      setShowAddForm(false);
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

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

        {/* Add Expense Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nuevo Gasto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddExpense} className="space-y-4">
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
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Guardar Gasto</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
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
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-budget-gray-600">No hay gastos registrados aún.</p>
                <p className="text-sm text-budget-gray-500 mt-2">
                  Añade tu primer gasto usando el botón de arriba.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border border-budget-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary">{expense.description}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-budget-gray-600">{expense.category}</span>
                        <span className="text-sm text-budget-gray-600">{expense.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-budget-danger">
                        €{expense.amount.toFixed(2)}
                      </span>
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
