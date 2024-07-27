import { GetJobsApi } from "@/endpoints/get-jobs/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const getJobsPath = "get-jobs";

beforeAll(async () => {
  // await cleanDb();
});

describe("getJobs API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<GetJobsApi.SuccessResponse>(getJobsPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
