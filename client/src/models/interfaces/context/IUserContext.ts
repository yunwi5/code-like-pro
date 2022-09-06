import { IUser, IUserSubmissionPopulated, IUserDetail } from '..';

type LoginState = { email: string; password: string };
type ResponseType = { ok: boolean; message?: string; data?: IUser };

export interface IUserContext {
    user: IUser | null;
    login: (loginState: LoginState) => Promise<ResponseType>;
    logout: () => void;
    loginBySession: () => void;
    isLoading: boolean;
    likedExerciseIdSet: Set<string>;
    submissionMap: { [key: string]: IUserSubmissionPopulated };
    userDetail: IUserDetail | undefined;
}