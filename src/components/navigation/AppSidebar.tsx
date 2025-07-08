import { Home, CreditCard, BarChart3, User, LogOut, PanelLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Gastos',
    url: '/expenses',
    icon: CreditCard,
  },
  {
    title: 'Estadísticas',
    url: '/statistics',
    icon: BarChart3,
  },
  {
    title: 'Bienvenida',
    url: '/welcome',
    icon: User,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-white rounded-full shadow p-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <PanelLeft className="h-6 w-6" />
      </button>

      {isOpen && (
        <Sidebar>
          <SidebarHeader className="border-b border-budget-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2 px-2 py-2">
              <h1 className="text-xl font-bold text-gradient">BudgetNest</h1>
            </div>
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
            >
              <PanelLeft className="h-5 w-5" />
            </button>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                      >
                        <a href={item.url} onClick={(e) => {
                          e.preventDefault();
                          navigate(item.url);
                        }}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-budget-gray-200">
            <div className="p-2 space-y-2">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-budget-gray-50">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {user?.name ? getUserInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-budget-gray-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-budget-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
