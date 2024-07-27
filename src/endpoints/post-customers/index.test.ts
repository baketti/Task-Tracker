import { PostCustomersApi } from "@/endpoints/post-customers/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { closeDbConnection } from "@/lib/mongodb";
import { User } from "@/models/server/User";
import { TDM } from "@/lib/test-utils";

const postCustomersPath = "post-customers";
let cookieSession: { [key: string]: string };
let user: User;
beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
});
describe("postCustomers API", () => {
  test("It should fail for no authentication cookie set", async () => {
    const { statusCode } =
      await TestHandler.invokeLambda<PostCustomersApi.SuccessResponse>(
        postCustomersPath,
      );

    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
  test("It should return a new customer", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PostCustomersApi.SuccessResponse>(
        postCustomersPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          payload: {
            name: "Test Customer 1",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
