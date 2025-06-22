import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  color: string;
}

export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string; // ISO date string
}

export interface MonthlyBudget {
  id: string;
  month: string;
  year: number;
  totalBudget: number;
  categories: Category[];
  expenses: Expense[];
}

interface BudgetContextType {
  currentBudget: MonthlyBudget;
  monthlyBudgets: { [key: string]: MonthlyBudget };
  currentMonth: string;
  currentYear: number;
  updateCategorySpent: (categoryId: string, amount: number) => void;
  addExpenseToCategory: (categoryId: string, amount: number, description: string, date: string) => void;
  updateMonthlyBudget: (month: string, year: number, totalBudget: number) => void;
  setCurrentMonth: (month: string, year: number) => void;
  getMonthlyBudget: (month: string, year: number) => MonthlyBudget;
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
  const [currentMonth, setCurrentMonthState] = useState('Diciembre');
  const [currentYear, setCurrentYearState] = useState(2024);
  
  // Mock data for multiple monthly budgets
  const [monthlyBudgets, setMonthlyBudgets] = useState<{ [key: string]: MonthlyBudget }>({
    'Diciembre-2024': {
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
          color: 'bg-blue-900',
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
      expenses: [
        { id: '1', categoryId: 'vivienda', amount: 550, description: 'Alquiler', date: '2024-12-01' },
        { id: '2', categoryId: 'alimentacion', amount: 150, description: 'Supermercado', date: '2024-12-05' },
        { id: '3', categoryId: 'transporte', amount: 120, description: 'Gasolina', date: '2024-12-10' },
        { id: '4', categoryId: 'ocio', amount: 80, description: 'Cine', date: '2024-12-15' },
        { id: '5', categoryId: 'alimentacion', amount: 135, description: 'Restaurante', date: '2024-12-20' },
        { id: '6', categoryId: 'deportes', amount: 75, description: 'Gimnasio', date: '2024-12-25' },
        { id: '7', categoryId: 'cuidado', amount: 45, description: 'Productos de higiene', date: '2024-12-28' },
        { id: '8', categoryId: 'educacion', amount: 90, description: 'Curso online', date: '2024-12-30' },
        { id: '9', categoryId: 'personal', amount: 30, description: 'Ropa', date: '2024-12-31' },
        { id: '10', categoryId: 'ocio', amount: 100, description: 'Cena con amigos', date: '2024-12-22' },
      ],
    },
    'Noviembre-2024': {
      id: '2',
      month: 'Noviembre',
      year: 2024,
      totalBudget: 1800,
      categories: [
        {
          id: 'vivienda',
          name: 'Vivienda',
          budgetAmount: 600,
          spentAmount: 600,
          color: 'bg-blue-500',
        },
        {
          id: 'alimentacion',
          name: 'Alimentación',
          budgetAmount: 400,
          spentAmount: 320,
          color: 'bg-green-500',
        },
        {
          id: 'transporte',
          name: 'Transporte',
          budgetAmount: 200,
          spentAmount: 150,
          color: 'bg-yellow-500',
        },
        {
          id: 'ocio',
          name: 'Ocio Y Entretenimiento',
          budgetAmount: 300,
          spentAmount: 200,
          color: 'bg-purple-500',
        },
        {
          id: 'deportes',
          name: 'Deportes / Salud',
          budgetAmount: 150,
          spentAmount: 80,
          color: 'bg-red-500',
        },
        {
          id: 'cuidado',
          name: 'Cuidado Personal',
          budgetAmount: 100,
          spentAmount: 60,
          color: 'bg-pink-500',
        },
        {
          id: 'educacion',
          name: 'Educación',
          budgetAmount: 150,
          spentAmount: 100,
          color: 'bg-indigo-500',
        },
        {
          id: 'personal',
          name: 'Personal',
          budgetAmount: 100,
          spentAmount: 40,
          color: 'bg-orange-500',
        },
      ],
      expenses: [
        { id: '11', categoryId: 'vivienda', amount: 600, description: 'Alquiler', date: '2024-11-01' },
        { id: '12', categoryId: 'alimentacion', amount: 200, description: 'Supermercado', date: '2024-11-05' },
        { id: '13', categoryId: 'transporte', amount: 150, description: 'Gasolina', date: '2024-11-10' },
      ],
    },
  });

  const getMonthlyBudget = (month: string, year: number): MonthlyBudget => {
    const key = `${month}-${year}`;
    if (!monthlyBudgets[key]) {
      // Create default budget for new month
      const defaultBudget: MonthlyBudget = {
        id: key,
        month,
        year,
        totalBudget: 2000,
        categories: [
          { id: 'vivienda', name: 'Vivienda', budgetAmount: 600, spentAmount: 0, color: 'bg-blue-500' },
          { id: 'alimentacion', name: 'Alimentación', budgetAmount: 400, spentAmount: 0, color: 'bg-green-500' },
          { id: 'transporte', name: 'Transporte', budgetAmount: 200, spentAmount: 0, color: 'bg-blue-900' },
          { id: 'ocio', name: 'Ocio Y Entretenimiento', budgetAmount: 300, spentAmount: 0, color: 'bg-purple-500' },
          { id: 'deportes', name: 'Deportes / Salud', budgetAmount: 150, spentAmount: 0, color: 'bg-red-500' },
          { id: 'cuidado', name: 'Cuidado Personal', budgetAmount: 100, spentAmount: 0, color: 'bg-pink-500' },
          { id: 'educacion', name: 'Educación', budgetAmount: 150, spentAmount: 0, color: 'bg-indigo-500' },
          { id: 'personal', name: 'Personal', budgetAmount: 100, spentAmount: 0, color: 'bg-orange-500' },
        ],
        expenses: [],
      };
      setMonthlyBudgets(prev => ({ ...prev, [key]: defaultBudget }));
      return defaultBudget;
    }
    return monthlyBudgets[key];
  };

  const currentBudget = getMonthlyBudget(currentMonth, currentYear);

  const updateCategorySpent = (categoryId: string, amount: number) => {
    const key = `${currentMonth}-${currentYear}`;
    setMonthlyBudgets(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        categories: prev[key].categories.map(cat =>
          cat.id === categoryId
            ? { ...cat, spentAmount: amount }
            : cat
        ),
      },
    }));
  };

  const addExpenseToCategory = (categoryId: string, amount: number, description: string, date: string) => {
    const key = `${currentMonth}-${currentYear}`;
    const newExpense: Expense = {
      id: Date.now().toString(),
      categoryId,
      amount,
      description,
      date,
    };
    
    setMonthlyBudgets(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        expenses: [...prev[key].expenses, newExpense],
        categories: prev[key].categories.map(cat =>
          cat.id === categoryId
            ? { ...cat, spentAmount: cat.spentAmount + amount }
            : cat
        ),
      },
    }));
  };

  const updateMonthlyBudget = (month: string, year: number, totalBudget: number) => {
    const key = `${month}-${year}`;
    setMonthlyBudgets(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        totalBudget,
      },
    }));
  };

  const setCurrentMonth = (month: string, year: number) => {
    setCurrentMonthState(month);
    setCurrentYearState(year);
  };

  const value: BudgetContextType = {
    currentBudget,
    monthlyBudgets,
    currentMonth,
    currentYear,
    updateCategorySpent,
    addExpenseToCategory,
    updateMonthlyBudget,
    setCurrentMonth,
    getMonthlyBudget,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
