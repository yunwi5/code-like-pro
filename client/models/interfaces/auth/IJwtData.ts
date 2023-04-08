import { IUser } from '../user/IUser';

export interface IJwtData {
  access_token: string;
  user: IUser;
}
