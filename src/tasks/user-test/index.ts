import { User } from "@/models/server/User";
import { UserRoles } from "@/models/common/UserCommon";

export const userTest = async () => {
  await User.create("emanuele@gmail.com", "12345678", UserRoles.Admin);
};
