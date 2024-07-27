import { GetWorkersApi } from "@/endpoints/get-workers/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const getWorkersPath = "get-workers";

beforeAll(async () => {
  // await cleanDb();
});

describe("getWorkers API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<GetWorkersApi.SuccessResponse>(getWorkersPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
