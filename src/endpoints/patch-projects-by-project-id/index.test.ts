import { PatchProjectsByProjectIdApi } from "@/endpoints/patch-projects-by-project-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { closeDbConnection } from "@/lib/mongodb";
import { TDM } from "@/lib/test-utils";
import { ObjectId } from "mongodb";

const patchProjectsByProjectIdPath = "patch-projects-by-project-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createUser(1);
  await TDM.createCustomer();
  await TDM.createProject();
});

describe("patchProjectsByProjectId API", () => {
  test("It should fail for no payload specified", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchProjectsByProjectIdApi.SuccessResponse>(
        patchProjectsByProjectIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
  test("It should fail for no project with this id", async () => {
    const project = TDM.getProject();
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchProjectsByProjectIdApi.SuccessResponse>(
        patchProjectsByProjectIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            projectId: new ObjectId().toHexString(),
          },
          payload: {
            name: project.name + " updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.NotFound);
  });
  test("It should update project name", async () => {
    const project = TDM.getProject();
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchProjectsByProjectIdApi.SuccessResponse>(
        patchProjectsByProjectIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            projectId: project._id.toHexString(),
          },
          payload: {
            name: project.name + "updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    expect(payload.project.name).toBe(project.name + "updated");
    await project.refresh();
    expect(project.name).toBe(payload.project.name);
  });
  test("It should update intermediaryId from 2 to 1", async () => {
    const project = TDM.getProject();
    const user = TDM.getUser(2);
    console.log(project);
    console.log(user);
    console.log(TDM.getCustomer());
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchProjectsByProjectIdApi.SuccessResponse>(
        patchProjectsByProjectIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            projectId: project._id.toHexString(),
          },
          payload: {
            intermediaryId: TDM.getUser(1)._id,
          },
        },
      );
    console.log(payload.project);
    console.log(payload.message);
    expect(statusCode).toBe(StatusCodes.OK);
    await project.refresh();
    expect(project.intermediaryId.toHexString()).toBe(
      payload.project.intermediaryId,
    );
  });
});

afterAll(async () => {
  await closeDbConnection();
});
