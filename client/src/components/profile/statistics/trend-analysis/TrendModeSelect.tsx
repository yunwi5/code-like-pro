import React from 'react';
import { TrendPeriodMode, TrendPeriodModeList } from '../../../../models/enums';

interface Props {
    trendMode: TrendPeriodMode;
    setTrendMode: React.Dispatch<React.SetStateAction<TrendPeriodMode>>;
}

// Component to select analysis period either day, week, month or year. Used for selecting mode for trend analysis.
const TrendModeSelect: React.FC<Props> = ({ trendMode, setTrendMode }) => {
    return (
        <div className="flex-start gap-2">
            {TrendPeriodModeList.map((period) => (
                <button
                    key={period}
                    onClick={() => setTrendMode(period)}
                    className={`px-3 py-1 text-base lg:text-lg rounded-md shadow bg-slate-200 hover:bg-slate-300 ${
                        period === trendMode
                            ? 'text-gray-50 bg-slate-600 hover:bg-slate-700'
                            : ''
                    }`}
                >
                    {period}
                </button>
            ))}
        </div>
    );
};

export default TrendModeSelect;
