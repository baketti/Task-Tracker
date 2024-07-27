import { PostProjectsApi } from "@/endpoints/post-projects/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";

const postProjectsPath = "post-projects";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createUser(2);
  await TDM.createCustomer();
  await TDM.createProject();
});

describe("postProjects API", () => {
  test("It should fail for no auth cookie set", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostProjectsApi.SuccessResponse>(
        postProjectsPath,
        {
          payload: {
            name: "Test Project 1",
            website: "https://www.test-project-1.com",
            customerId: TDM.getCustomer()._id,
            intermediaryId: TDM.getUser(2)._id,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
  test("It should create a new project", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostProjectsApi.SuccessResponse>(
        postProjectsPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          payload: {
            name: "Test Project 1",
            website: "https://www.test-project-1.com",
            customerId: TDM.getCustomer()._id,
            intermediaryId: TDM.getUser(2)._id,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
  });
  test("It should fail because customerId is a required field", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostProjectsApi.SuccessResponse>(
        postProjectsPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          payload: {
            name: "Test Project 1",
            website: "https://www.test-project-1.com",
            intermediaryId: TDM.getUser(2)._id,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
