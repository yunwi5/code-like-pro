import { IChartData } from '..';

export interface ITrendDataset {
    label: string;
    dataArray: IChartData[];
    borderColor: string;
    backgroundColor: string;
    borderWidth?: number;
}
