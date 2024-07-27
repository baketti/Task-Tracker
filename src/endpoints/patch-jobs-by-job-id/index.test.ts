import { PatchJobsByJobIdApi } from "@/endpoints/patch-jobs-by-job-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { ObjectId } from "mongodb";
import { closeDbConnection } from "@/lib/mongodb";

const patchJobsByJobIdPath = "patch-jobs-by-job-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createCustomer();
  await TDM.createWorker(1);
  await TDM.createProject(1);
  await TDM.createJob(1);
});

describe("patchJobsByJobId API", () => {
  test("It should fail for no payload specified", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchJobsByJobIdApi.SuccessResponse>(
        patchJobsByJobIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
  test("It should fail for no job with this id", async () => {
    const job = TDM.getJob(1);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchJobsByJobIdApi.SuccessResponse>(
        patchJobsByJobIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            jobId: new ObjectId().toHexString(),
          },
          payload: {
            name: job.name + " updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.NotFound);
  });
  test("It should update job name", async () => {
    const job = TDM.getJob(1);
    console.log(job);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchJobsByJobIdApi.SuccessResponse>(
        patchJobsByJobIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            jobId: job._id.toHexString(),
          },
          payload: {
            name: job.name + "updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    await job.refresh();
    expect(job.name).toBe(payload.job.name);
  });
  test("It should fail for no admin authenticated", async () => {
    const job = TDM.getJob(1);
    console.log(job);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchJobsByJobIdApi.SuccessResponse>(
        patchJobsByJobIdPath,
        {
          queryString: {
            jobId: job._id.toHexString(),
          },
          payload: {
            name: job.name + "updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
