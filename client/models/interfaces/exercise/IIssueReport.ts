import { IVote } from '../showcase/IVote';

export interface IIssueReport {
  _id: string;
  category: string;
  description: string;
  user?: { _id: string; name: string }; // MongoDB user id when the report is created on the back end.
  votes: IVote[];
}
