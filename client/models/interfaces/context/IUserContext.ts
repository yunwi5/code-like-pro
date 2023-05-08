import { AuthResponseData } from '../../../apis/auth.api';
import { IUser, IUserDetail, IUserSubmissionPopulated } from '..';

type LoginState = { email: string; password: string };
type ResponseType = {
  ok: boolean;
  message?: string;
  data?: AuthResponseData;
};

export interface IUserContext {
  user: IUser | null;
  isLoading: boolean;
  login: (loginState: LoginState) => Promise<ResponseType>;
  logout: () => void;
  storeJwtData: (jwtToken: string, user: IUser) => void;

  refetchDetail: () => void;
  likedExerciseIdSet: Set<string>;
  submissionMap: { [key: string]: IUserSubmissionPopulated };
  userDetail: IUserDetail | undefined;
}
