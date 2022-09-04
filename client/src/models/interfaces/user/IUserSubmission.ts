export interface IUserSubmission {
    _id: string;
    code: string;
    correct: boolean;
    user: string; // user id unpopulated
    exercise: string; // exercise id unpopulated
    postedAt: string; // ISO date format
}
