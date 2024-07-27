import { PostJobsApi } from "@/endpoints/post-jobs/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";

const postJobsPath = "post-jobs";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createCustomer();
  //await TDM.createWorker(2);
  await TDM.createProject();
  await TDM.createJob();
});

describe("postJobs API", () => {
  test("It should fail for no authentication cookie set", async () => {
    const { statusCode } =
      await TestHandler.invokeLambda<PostJobsApi.SuccessResponse>(
        postJobsPath,
        {
          payload: {
            name: "Test Job 1",
            income: 1000,
            isActive: true,
            projectId: TDM.getProject()._id,
          },
        },
      );

    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
  test("It should return a new Job", async () => {
    const project = TDM.getProject();
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostJobsApi.SuccessResponse>(
        postJobsPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          payload: {
            name: "Test Job 1",
            income: 1000,
            isActive: true,
            projectId: project._id,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
  });
  test("It should fail because projectId is a required field", async () => {
    const project = TDM.getProject();
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostJobsApi.SuccessResponse>(
        postJobsPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          payload: {
            name: "Test Job 1",
            income: 1000,
            isActive: true,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
