import React, { useState } from 'react';
import { TrendPeriodMode } from '../../../../models/enums';
import TrendModeSelect from './TrendModeSelect';
import ExerciseCreationTrend from './ExerciseCreationTrend';
import ExerciseAttemptTrend from './ExerciseAttemptTrend';
import { FaRobot } from 'react-icons/fa';

type TrendSection = 'attempt' | 'create' | null;

// Main component for trend analysis of user exercise creatio and attempts.
const TrendAnalysis: React.FC = () => {
  const [trendMode, setTrendMode] = useState(TrendPeriodMode.DAY);

  return (
    <div className="mt-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h2 className="text-3xl text-gray-600">Trend Analysis</h2>
        <TrendModeSelect trendMode={trendMode} setTrendMode={setTrendMode} />
      </header>
      <div className="mt-7 flex flex-wrap justify-between flex-col lg:flex-row gap-x-3 gap-y-8">
        <ExerciseAttemptTrend trendMode={trendMode} />
        <ExerciseCreationTrend trendMode={trendMode} />
      </div>
      <footer className="flex-start gap-2 mt-5 font-semibold">
        <FaRobot className="text-sky-500 text-xl" /> Keep pushing forward!
      </footer>
    </div>
  );
};

export default TrendAnalysis;
