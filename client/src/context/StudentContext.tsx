import React, { createContext, useState, ReactNode, useContext } from 'react';

interface StudentContextType {
  studentId: string;
  setStudentId: React.Dispatch<React.SetStateAction<string>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const [studentId, setStudentId] = useState<string>('');

  return (
    <StudentContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
