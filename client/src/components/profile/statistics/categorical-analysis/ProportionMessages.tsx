import React from 'react';
import { IChartData } from '../../../../models/interfaces';
import { round } from '../../../../utils/calculation';

interface Props {
    dataArray: IChartData[];
    total: number;
}

const ProportionMessages: React.FC<Props> = ({ dataArray, total }) => {
    return (
        <div className="flex flex-col gap-2">
            {dataArray.map((data, idx) => (
                <div key={idx} className="flex-start gap-2">
                    <h5 className="font-semibold text-gray-600">{data.label}:</h5>
                    {/* When calculating proportion, prevent division by zero. */}
                    <p>{round((data.value / (total || 1)) * 100).toFixed(1)}%</p>
                </div>
            ))}
        </div>
    );
};

export default ProportionMessages;
