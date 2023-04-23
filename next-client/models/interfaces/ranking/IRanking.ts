import { IUser } from '..';

export interface IRanking extends IUser {
  creationPoints: number;
  solvingPoints: number;
}
