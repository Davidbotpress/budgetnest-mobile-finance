
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/contexts/BudgetContext';
import { LoadingButton } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-boundary';
import { useToast } from '@/hooks/use-toast';

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

interface FormErrors {
  description?: string;
  amount?: string;
  categoryId?: string;
  general?: string;
}

const ExpenseForm = ({
  editingExpense,
  newExpense,
  setNewExpense,
  categories,
  onSubmit,
  onCancel
}: ExpenseFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Description validation
    if (!newExpense.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (newExpense.description.trim().length < 3) {
      newErrors.description = 'La descripción debe tener al menos 3 caracteres';
    } else if (newExpense.description.trim().length > 100) {
      newErrors.description = 'La descripción no puede exceder 100 caracteres';
    }

    // Amount validation
    const amount = parseFloat(newExpense.amount);
    if (!newExpense.amount.trim()) {
      newErrors.amount = 'La cantidad es obligatoria';
    } else if (isNaN(amount)) {
      newErrors.amount = 'Debe ser un número válido';
    } else if (amount <= 0) {
      newErrors.amount = 'La cantidad debe ser mayor a 0';
    } else if (amount > 999999.99) {
      newErrors.amount = 'La cantidad no puede exceder €999,999.99';
    }

    // Category validation
    if (!newExpense.categoryId) {
      newErrors.categoryId = 'Debe seleccionar una categoría';
    } else if (!categories.find(cat => cat.id === newExpense.categoryId)) {
      newErrors.categoryId = 'Categoría no válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Error de validación",
        description: "Por favor, corrige los errores en el formulario",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(e);
      toast({
        title: editingExpense ? "Gasto actualizado" : "Gasto creado",
        description: editingExpense 
          ? "El gasto se ha actualizado correctamente" 
          : "El gasto se ha registrado correctamente"
      });
    } catch (error) {
      setErrors({ 
        general: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.' 
      });
      toast({
        title: "Error",
        description: "No se pudo guardar el gasto. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setNewExpense({ ...newExpense, [field]: value });
    // Clear field error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <Card className="mb-6 md:mb-8">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          {editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {errors.general && (
          <ErrorMessage 
            message={errors.general} 
            onRetry={() => setErrors({ ...errors, general: undefined })}
          />
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descripción *
              </Label>
              <Input
                id="description"
                type="text"
                value={newExpense.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Ej: Almuerzo en restaurante"
                className={errors.description ? 'border-red-500 focus:ring-red-500' : ''}
                disabled={isSubmitting}
                maxLength={100}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
              <p className="text-xs text-budget-gray-500">
                {newExpense.description.length}/100 caracteres
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Cantidad (€) *
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                max="999999.99"
                value={newExpense.amount}
                onChange={(e) => handleFieldChange('amount', e.target.value)}
                placeholder="15.50"
                className={errors.amount ? 'border-red-500 focus:ring-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Categoría *
            </Label>
            <select
              id="category"
              value={newExpense.categoryId}
              onChange={(e) => handleFieldChange('categoryId', e.target.value)}
              className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.categoryId 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-input bg-background'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-600">{errors.categoryId}</p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <LoadingButton />
              ) : (
                editingExpense ? 'Actualizar Gasto' : 'Guardar Gasto'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
