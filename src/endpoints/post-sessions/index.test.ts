import { PostSessionsApi } from "@/endpoints/post-sessions/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const postSessionsPath = "post-sessions";

beforeAll(async () => {
  // await cleanDb();
});

describe("postSessions API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<PostSessionsApi.SuccessResponse>(postSessionsPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
