import { DeleteWorkersByWorkerIdApi } from "@/endpoints/delete-workers-by-worker-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";
import { Worker } from "@/models/server/Worker";

const deleteWorkersByWorkerIdPath = "delete-workers-by-worker-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createWorker(1);
});

describe("deleteWorkersByWorkerId API", () => {
  test("It should delete the worker", async () => {
    let workers = await Worker.getList({}, { limit: 0 });
    expect(workers.length).toBe(1);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteWorkersByWorkerIdApi.SuccessResponse>(
        deleteWorkersByWorkerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            workerId: TDM.getWorker(1)._id.toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    workers = await Worker.getList({}, { limit: 0 });
    expect(workers.length).toBe(0);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
