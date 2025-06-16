
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Mock authentication - ready for Supabase integration
  useEffect(() => {
    // Check if user is already logged in (localStorage for mock)
    const savedUser = localStorage.getItem('budgetnest_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock login - replace with Supabase auth
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'Usuario Demo',
        email: email,
      };
      
      setUser(mockUser);
      localStorage.setItem('budgetnest_user', JSON.stringify(mockUser));
      
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock registration - replace with Supabase auth
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
      };
      
      setUser(mockUser);
      localStorage.setItem('budgetnest_user', JSON.stringify(mockUser));
      localStorage.setItem('budgetnest_is_new_user', 'true'); // Flag for new users
      
      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta ha sido creada exitosamente.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error de registro",
        description: "No se pudo crear la cuenta. Intenta nuevamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('budgetnest_user');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
