import { GetWorkersByWorkerIdApi } from "@/endpoints/get-workers-by-worker-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const getWorkersByWorkerIdPath = "get-workers-by-worker-id";

beforeAll(async () => {
  // await cleanDb();
});

describe("getWorkersByWorkerId API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<GetWorkersByWorkerIdApi.SuccessResponse>(getWorkersByWorkerIdPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
