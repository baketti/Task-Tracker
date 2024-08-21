require("custom-env").env("local");
require("custom-env");
import { userTest } from "@/tasks/user-test";
import mongoDao from "@/lib/mongodb/mongo-dao";

(async () => {
  try {
    await userTest();
    console.log("DONE!");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoDao.mongoClient?.close();
    process.exit(0);
  }
})();
