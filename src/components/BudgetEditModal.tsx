import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBudget } from '@/contexts/BudgetContext';

interface BudgetEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  month: string;
  year: number;
}

const BudgetEditModal = ({ isOpen, onClose, month, year }: BudgetEditModalProps) => {
  const { currentBudget, updateMonthlyBudget } = useBudget();
  const [budgetAmount, setBudgetAmount] = useState(currentBudget.totalBudget.toString());
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const amount = parseFloat(budgetAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Por favor ingresa un monto válido');
        return;
      }
      
      updateMonthlyBudget(month, year, amount);
      onClose();
    } catch (error) {
      console.error('Error al guardar el presupuesto:', error);
      alert('Error al guardar el presupuesto');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setBudgetAmount(currentBudget.totalBudget.toString());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Presupuesto - {month} {year}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="budget-amount">Presupuesto Total (€)</Label>
            <Input
              id="budget-amount"
              type="number"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>
        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetEditModal; 