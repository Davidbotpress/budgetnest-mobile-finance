
import { Home, CreditCard, BarChart3, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    label: 'Inicio',
  },
  {
    title: 'Gastos',
    url: '/expenses',
    icon: CreditCard,
    label: 'Gastos',
  },
  {
    title: 'Estadísticas',
    url: '/statistics',
    icon: BarChart3,
    label: 'Stats',
  },
  {
    title: 'Bienvenida',
    url: '/welcome',
    icon: User,
    label: 'Perfil',
  },
];

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-budget-gray-200 safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <button
              key={item.title}
              onClick={() => navigate(item.url)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-budget-gray-600 hover:text-primary"
              )}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-budget-gray-600"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary" : "text-budget-gray-600"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
