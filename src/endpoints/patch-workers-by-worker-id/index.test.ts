import { PatchWorkersByWorkerIdApi } from "@/endpoints/patch-workers-by-worker-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const patchWorkersByWorkerIdPath = "patch-workers-by-worker-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createCustomer();
  await TDM.createProject();
  await TDM.createJob();
  await TDM.createJob(2);
  await TDM.createWorker(2);
});

describe("patchWorkersByWorkerId API", () => {
  test("It should fail for no payload specified", async () => {
    const worker = TDM.getWorker(2);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchWorkersByWorkerIdApi.SuccessResponse>(
        patchWorkersByWorkerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });

  test("It should fail for no worker with this id", async () => {
    const worker = TDM.getWorker(2);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchWorkersByWorkerIdApi.SuccessResponse>(
        patchWorkersByWorkerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            workerId: new ObjectId().toHexString(),
          },
          payload: {
            fullName: worker.fullName + " updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.NotFound);
  });
  test("It should update worker name", async () => {
    const worker = TDM.getWorker(2);
    console.log({ worker });
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchWorkersByWorkerIdApi.SuccessResponse>(
        patchWorkersByWorkerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            workerId: worker._id.toHexString(),
          },
          payload: {
            fullName: worker.fullName + " updated",
          },
        },
      );
    console.log({ worker });
    expect(statusCode).toBe(StatusCodes.OK);
    await worker.refresh();
    expect(worker.fullName).toBe(payload.worker.fullName);
  });
  test("It should update enabled jobs by adding another job", async () => {
    const worker = TDM.getWorker(2);
    const job = TDM.getJob(2);
    expect(worker.enabledJobIds.length).toBe(1);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchWorkersByWorkerIdApi.SuccessResponse>(
        patchWorkersByWorkerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            workerId: worker._id.toHexString(),
          },
          payload: {
            enabledJobIds: [...worker.enabledJobIds, job._id],
          },
        },
      );
    console.log({ worker });
    expect(statusCode).toBe(StatusCodes.OK);
    expect(payload.worker.enabledJobIds.length).toBe(2);
    await worker.refresh();
    const enableJobIds = worker.enabledJobIds.map((i) => i.toHexString());
    console.log(enableJobIds);
    console.log(payload.worker.enabledJobIds);
    expect(enableJobIds).toStrictEqual(payload.worker.enabledJobIds);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
