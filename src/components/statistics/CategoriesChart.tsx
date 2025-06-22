import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Category } from '@/contexts/BudgetContext';

interface CategoriesChartProps {
  categories: Category[];
}

const CategoriesChart = ({ categories }: CategoriesChartProps) => {
  const categoryData = categories.map((category, index) => ({
    name: category.name,
    value: category.spentAmount,
    budget: category.budgetAmount,
    fill: [
      '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', 
      '#ef4444', '#ec4899', '#6366f1', '#f97316'
    ][index % 8],
    percentage: Math.round((category.spentAmount / category.budgetAmount) * 100),
  }));

  const categoryChartConfig = categoryData.reduce((config, category, index) => {
    config[category.name.toLowerCase().replace(/\s+/g, '')] = {
      label: category.name,
      color: category.fill,
    };
    return config;
  }, {} as any);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Distribución por Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={categoryChartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p className="font-semibold">{data.name}</p>
                          <p>Gastado: €{data.value.toFixed(2)}</p>
                          <p>Presupuesto: €{data.budget.toFixed(2)}</p>
                          <p>Porcentaje: {data.percentage}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Progreso por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-budget-gray-700">
                    {category.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${category.percentage > 100 ? 'text-budget-danger' : 'text-budget-gray-600'}`}>
                      {category.percentage}%
                    </span>
                    <span className="text-sm font-bold text-primary">
                      €{category.value.toFixed(2)} / €{category.budget.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-budget-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      category.percentage > 100 ? 'bg-budget-danger' :
                      category.percentage > 80 ? 'bg-budget-primary' : 'bg-budget-success'
                    }`}
                    style={{ width: `${Math.min(category.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesChart;
