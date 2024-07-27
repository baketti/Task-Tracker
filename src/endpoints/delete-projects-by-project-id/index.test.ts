import { DeleteProjectsByProjectIdApi } from "@/endpoints/delete-projects-by-project-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { Worker } from "@/models/server/Worker";
import { Project } from "@/models/server/Project";
import { closeDbConnection } from "@/lib/mongodb";
import * as querystring from "querystring";

const deleteProjectsByProjectIdPath = "delete-projects-by-project-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createCustomer();
  await TDM.createProject();
});

describe("deleteProjectsByProjectId API", () => {
  test("It should delete the project", async () => {
    let projects = await Project.getList({}, { limit: 0 });
    console.log("projects.length ", projects.length);
    console.log("projects[0] ", projects[0]);
    expect(projects.length).toBe(1);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteProjectsByProjectIdApi.SuccessResponse>(
        deleteProjectsByProjectIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            projectId: TDM.getProject()._id.toHexString(),
          },
        },
      );
    console.log("projectID: ", payload.message);
    expect(statusCode).toBe(StatusCodes.OK);
    projects = await Project.getList({}, { limit: 0 });
    console.log("projects.length ", projects.length);
    expect(projects.length).toBe(0);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
