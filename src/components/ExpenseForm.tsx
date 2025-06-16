
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/contexts/BudgetContext';

interface Expense {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
}

interface ExpenseFormProps {
  editingExpense: Expense | null;
  newExpense: {
    description: string;
    amount: string;
    categoryId: string;
  };
  setNewExpense: React.Dispatch<React.SetStateAction<{
    description: string;
    amount: string;
    categoryId: string;
  }>>;
  categories: Category[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ExpenseForm = ({
  editingExpense,
  newExpense,
  setNewExpense,
  categories,
  onSubmit,
  onCancel
}: ExpenseFormProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
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
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <Button type="submit">
              {editingExpense ? 'Actualizar Gasto' : 'Guardar Gasto'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
