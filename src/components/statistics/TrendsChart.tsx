
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const TrendsChart = () => {
  // Monthly spending data for the last 6 months
  const monthlyData = [
    { month: 'Jul', gastos: 450, presupuesto: 2000 },
    { month: 'Ago', gastos: 520, presupuesto: 2000 },
    { month: 'Sep', gastos: 380, presupuesto: 2000 },
    { month: 'Oct', gastos: 610, presupuesto: 2000 },
    { month: 'Nov', gastos: 490, presupuesto: 2000 },
    { month: 'Dic', gastos: 1375, presupuesto: 2000 },
  ];

  const chartConfig = {
    gastos: {
      label: "Gastos",
      color: "#3b82f6",
    },
    presupuesto: {
      label: "Presupuesto",
      color: "#e5e7eb",
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Tendencia de Gastos Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="gastos" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Gastos (€)"
                />
                <Line 
                  type="monotone" 
                  dataKey="presupuesto" 
                  stroke="#e5e7eb" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Presupuesto (€)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Comparación Gastos vs Presupuesto</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="presupuesto" fill="#e5e7eb" name="Presupuesto (€)" />
                <Bar dataKey="gastos" fill="#3b82f6" name="Gastos (€)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsChart;
