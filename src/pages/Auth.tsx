import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-budget-gray-50 to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient mb-2">BudgetNest</h1>
          <p className="text-budget-gray-600">
            Controla tu presupuesto de manera inteligente
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register" className="mt-6">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center text-sm text-budget-gray-500">
          <p>¿Necesitas ayuda? <a href="#" className="text-primary hover:underline">Contactar soporte</a></p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
