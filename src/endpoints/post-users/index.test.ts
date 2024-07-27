import { PostUsersApi } from "@/endpoints/post-users/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const postUsersPath = "post-users";

beforeAll(async () => {
  // await cleanDb();
});

describe("postUsers API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<PostUsersApi.SuccessResponse>(postUsersPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
