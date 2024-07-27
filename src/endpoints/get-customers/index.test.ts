import { GetCustomersApi } from "@/endpoints/get-customers/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";

const getCustomersPath = "get-customers";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
});

describe("getCustomers API", () => {
  test("It should return 0 customers", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<GetCustomersApi.SuccessResponse>(
        getCustomersPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    expect(payload.customers.length).toBe(0);
  });

  test("It should return 1 customer", async () => {
    await TDM.createCustomer();
    const { statusCode, payload } =
      await TestHandler.invokeLambda<GetCustomersApi.SuccessResponse>(
        getCustomersPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    expect(payload.customers.length).toBe(1);
    expect(payload.customers[0].name).toBe(TDM.getCustomer().name);
  });

  test("It should return 3 customers", async () => {
    await TDM.createCustomer(1);
    await TDM.createCustomer(2);
    const { statusCode, payload } =
      await TestHandler.invokeLambda<GetCustomersApi.SuccessResponse>(
        getCustomersPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    expect(payload.customers.length).toBe(3);
    expect(payload.customers[2].name).toBe(TDM.getCustomer(2).name);
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
