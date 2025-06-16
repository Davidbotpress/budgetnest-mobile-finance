import { AppLayout } from '@/components/layout/AppLayout';

// This component is now redundant since we're using AppLayout
// We can keep this for backwards compatibility but recommend using AppLayout directly
const StatisticsHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppLayout title="Estadísticas">
      {children}
    </AppLayout>
  );
};

export default StatisticsHeader;
