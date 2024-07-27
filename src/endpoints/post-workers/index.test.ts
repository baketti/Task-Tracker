import { PostWorkersApi } from "@/endpoints/post-workers/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";

const postWorkersPath = "post-workers";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createCustomer();
  await TDM.createProject();
  await TDM.createJob();
  await TDM.createWorker(2);
});

describe("postWorkers API", () => {
  test("It should fail for no auth cookie set", async () => {
    const job = TDM.getJob();
    const user = TDM.getUser(0);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostWorkersApi.SuccessResponse>(
        postWorkersPath,
        {
          payload: {
            fullName: "Test Worker 1",
            enabledJobIds: [job._id],
            userId: user._id,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
  test("It should create a new worker", async () => {
    const job = TDM.getJob();
    const user = TDM.getUser(0);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostWorkersApi.SuccessResponse>(
        postWorkersPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          payload: {
            fullName: "Test Worker 1",
            enabledJobIds: [job._id],
            userId: user._id,
          },
        },
      );
    console.log(payload);
    expect(statusCode).toBe(StatusCodes.OK);
  });
  test("It should fail because fullName is  required field", async () => {
    const job = TDM.getJob();
    const user = TDM.getUser(0);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostWorkersApi.SuccessResponse>(
        postWorkersPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          payload: {
            enabledJobIds: [job._id],
            userId: user._id,
          },
        },
      );
    console.log(payload);
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
