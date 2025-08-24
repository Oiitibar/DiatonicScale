import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  darkMode: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, darkMode }) => {
  return (
    <ThemeContext.Provider value={{ darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};