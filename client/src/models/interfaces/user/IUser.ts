// Unpopulated version of user object structure.
export interface IUser {
    _id: string;
    name: string;
    email: string;
    createdAt: string | Date;
    liked: string[]; // list of exercise ids that user liked
    pictureUrl?: string; // user profile picture
}
