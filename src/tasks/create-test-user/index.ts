import { User } from "@/models/server/User";
import { UserRoles } from "@/models/common/UserCommon";
export const createUserTest = async () => {
  await User.create("ema@gmail.com", "12345678", UserRoles.Admin);
};
