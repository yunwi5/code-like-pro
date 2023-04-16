import { Difficulty } from './../../enums';

export interface IDifficultyVote {
    type: Difficulty;
    user: string; // user id
}
