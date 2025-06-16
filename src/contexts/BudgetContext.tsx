
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  color: string;
}

export interface MonthlyBudget {
  id: string;
  month: string;
  year: number;
  totalBudget: number;
  categories: Category[];
}

interface BudgetContextType {
  currentBudget: MonthlyBudget;
  updateCategorySpent: (categoryId: string, amount: number) => void;
  addExpenseToCategory: (categoryId: string, amount: number) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

interface BudgetProviderProps {
  children: ReactNode;
}

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  // Mock data for a single monthly budget
  const [currentBudget, setCurrentBudget] = useState<MonthlyBudget>({
    id: '1',
    month: 'Diciembre',
    year: 2024,
    totalBudget: 2000,
    categories: [
      {
        id: 'vivienda',
        name: 'Vivienda',
        budgetAmount: 600,
        spentAmount: 550,
        color: 'bg-blue-500',
      },
      {
        id: 'alimentacion',
        name: 'Alimentación',
        budgetAmount: 400,
        spentAmount: 285,
        color: 'bg-green-500',
      },
      {
        id: 'transporte',
        name: 'Transporte',
        budgetAmount: 200,
        spentAmount: 120,
        color: 'bg-yellow-500',
      },
      {
        id: 'ocio',
        name: 'Ocio Y Entretenimiento',
        budgetAmount: 300,
        spentAmount: 180,
        color: 'bg-purple-500',
      },
      {
        id: 'deportes',
        name: 'Deportes / Salud',
        budgetAmount: 150,
        spentAmount: 75,
        color: 'bg-red-500',
      },
      {
        id: 'cuidado',
        name: 'Cuidado Personal',
        budgetAmount: 100,
        spentAmount: 45,
        color: 'bg-pink-500',
      },
      {
        id: 'educacion',
        name: 'Educación',
        budgetAmount: 150,
        spentAmount: 90,
        color: 'bg-indigo-500',
      },
      {
        id: 'personal',
        name: 'Personal',
        budgetAmount: 100,
        spentAmount: 30,
        color: 'bg-orange-500',
      },
    ],
  });

  const updateCategorySpent = (categoryId: string, amount: number) => {
    setCurrentBudget(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, spentAmount: amount }
          : cat
      ),
    }));
  };

  const addExpenseToCategory = (categoryId: string, amount: number) => {
    setCurrentBudget(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, spentAmount: cat.spentAmount + amount }
          : cat
      ),
    }));
  };

  const value: BudgetContextType = {
    currentBudget,
    updateCategorySpent,
    addExpenseToCategory,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
