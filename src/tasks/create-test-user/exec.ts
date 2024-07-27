require("custom-env").env("local");
require("custom-env");
import { createUserTest } from "src/tasks/create-test-user";
import mongoDao from "@/lib/mongodb/mongo-dao";

(async () => {
  try {
    await createUserTest();
    console.log("DONE!");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoDao.mongoClient?.close();
    process.exit(0);
  }
})();
