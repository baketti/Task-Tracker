import mongodb from "@/lib/mongodb";

export const createDb = async () => {
  const mongo = await mongodb;
  mongo.db("task-tracker");
};
