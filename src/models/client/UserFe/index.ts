import { UserRoles } from "@/models/common/UserCommon";
import { ObjectIdFe } from "@/models/common/JsUtility";

export type IUserFe = {
  _id: ObjectIdFe;
  email: string;
  role: UserRoles;
};

export class UserFe implements IUserFe {
  _id: ObjectIdFe;
  email: string;
  role: UserRoles;
}
