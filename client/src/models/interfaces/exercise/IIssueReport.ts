export interface IIssueReport {
    _id?: string;
    category: string;
    description: string;
    user?: string; // MongoDB user id when the report is created on the back end.
}
