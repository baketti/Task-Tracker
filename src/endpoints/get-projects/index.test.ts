import { GetProjectsApi } from "@/endpoints/get-projects/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const getProjectsPath = "get-projects";

beforeAll(async () => {
  // await cleanDb();
});

describe("getProjects API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<GetProjectsApi.SuccessResponse>(getProjectsPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
