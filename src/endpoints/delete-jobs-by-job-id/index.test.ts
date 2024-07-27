import { DeleteJobsByJobIdApi } from "@/endpoints/delete-jobs-by-job-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { ObjectId } from "mongodb";
import { Job } from "@/models/server/Job";
import { closeDbConnection } from "@/lib/mongodb";

const deleteJobsByJobIdPath = "delete-jobs-by-job-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createCustomer();
  await TDM.createProject();
  await TDM.createJob();
});

describe("deleteJobsByJobId API", () => {
  test("It should fail for no payload specified", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteJobsByJobIdApi.SuccessResponse>(
        deleteJobsByJobIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
  test("It should fail for no admin authenticated", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteJobsByJobIdApi.SuccessResponse>(
        deleteJobsByJobIdPath,
        {
          queryString: {
            jobId: TDM.getJob()._id.toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
  test("It should fail for no costumer found with this _id", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteJobsByJobIdApi.SuccessResponse>(
        deleteJobsByJobIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            jobId: new ObjectId().toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });

  test("It should delete test job", async () => {
    let jobs = await Job.getList({}, { limit: 0 });
    expect(jobs.length).toBe(1);
    const { statusCode } =
      await TestHandler.invokeLambda<DeleteJobsByJobIdApi.SuccessResponse>(
        deleteJobsByJobIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            jobId: TDM.getJob()._id.toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    jobs = await Job.getList({}, { limit: 0 });
    expect(jobs.length).toBe(0);
  });
});
afterAll(async () => {
  await closeDbConnection();
});
