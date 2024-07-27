import { IUserFe } from "@/models/client/UserFe";

export interface UserState {
  me: IUserFe | null;
  isLogged: boolean;
}
