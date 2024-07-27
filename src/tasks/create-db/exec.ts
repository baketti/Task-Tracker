require("custom-env").env("local");
require("custom-env");
import mongoDao from "@/lib/mongodb/mongo-dao";
import { createDb } from "@/tasks/create-db";

(async () => {
  try {
    await createDb();
    console.log("DONE!");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoDao.mongoClient?.close();
    process.exit(0);
  }
})();
