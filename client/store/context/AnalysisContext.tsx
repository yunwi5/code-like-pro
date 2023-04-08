import React, { useContext, useEffect, useState } from 'react';
import { UserAnalyzer } from '../../models/classes';
import { useUserContext } from './UserContext';

interface IAnalysisContext {
  analyzer: UserAnalyzer | null;
}

export const AnalysisContext = React.createContext<IAnalysisContext>({ analyzer: null });

export const useAnalysisContext = () => useContext(AnalysisContext);

export const AnalysisContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userDetail } = useUserContext();
  const [analyzer, setAnalyzer] = useState<UserAnalyzer | null>(null);

  useEffect(() => {
    // If there is no user data yet, return.
    if (!userDetail) return;
    const newAnalyzer = new UserAnalyzer(userDetail.exercises, userDetail.submissions);
    setAnalyzer(newAnalyzer);
  }, [userDetail]);

  return (
    <AnalysisContext.Provider value={{ analyzer }}>{children}</AnalysisContext.Provider>
  );
};
