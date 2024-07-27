import { DeleteSessionsApi } from "@/endpoints/delete-sessions/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const deleteSessionsPath = "delete-sessions";

beforeAll(async () => {
  // await cleanDb();
});

describe("deleteSessions API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<DeleteSessionsApi.SuccessResponse>(deleteSessionsPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
