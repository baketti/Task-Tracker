import { GetUsersMeApi } from "@/endpoints/get-users-me/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const getUsersMePath = "get-users-me";

beforeAll(async () => {
  // await cleanDb();
});

describe("getUsersMe API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<GetUsersMeApi.SuccessResponse>(getUsersMePath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
