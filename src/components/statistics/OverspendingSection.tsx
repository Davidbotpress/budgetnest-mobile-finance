import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Category } from '@/contexts/BudgetContext';

interface OverspendingSectionProps {
  overspendingCategories: Category[];
}

const OverspendingSection = ({ overspendingCategories }: OverspendingSectionProps) => {
  if (overspendingCategories.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-budget-success mb-4">
            <TrendingUp className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-budget-success mb-2">
            ¡Excelente Control!
          </h3>
          <p className="text-budget-gray-600">
            No tienes categorías con exceso de gasto este mes. 
            Mantén este buen ritmo de control financiero.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-budget-danger flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Categorías con Exceso de Gasto</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overspendingCategories.map((category) => (
              <div key={category.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-red-800">{category.name}</h4>
                  <span className="text-red-600 font-bold">
                    +€{(category.spentAmount - category.budgetAmount).toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-red-700">
                  <p>Gastado: €{category.spentAmount.toFixed(2)}</p>
                  <p>Presupuesto: €{category.budgetAmount.toFixed(2)}</p>
                  <p>Exceso: {Math.round(((category.spentAmount - category.budgetAmount) / category.budgetAmount) * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos para Reducir Gastos</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Revisa los gastos recurrentes en las categorías excedidas</li>
                <li>• Considera establecer límites diarios para estas categorías</li>
                <li>• Busca alternativas más económicas</li>
              </ul>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">⚠️ Ajustar Presupuesto</h4>
              <p className="text-primary text-sm">
                Si estos excesos son regulares, considera ajustar tu presupuesto mensual 
                redistribuyendo fondos entre categorías.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverspendingSection;
