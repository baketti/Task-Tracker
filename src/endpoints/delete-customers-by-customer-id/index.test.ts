import { DeleteCustomersByCustomerIdApi } from "@/endpoints/delete-customers-by-customer-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";
import { PatchCustomersByCustomerIdApi } from "@/endpoints/patch-customers-by-customer-id/interfaces";
import { ObjectId } from "mongodb";
import { Customer } from "@/models/server/Customer";

const deleteCustomersByCustomerIdPath = "delete-customers-by-customer-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createCustomer();
});

describe("deleteCustomersByCustomerId API", () => {
  test("It should fail for no payload specified", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteCustomersByCustomerIdApi.SuccessResponse>(
        deleteCustomersByCustomerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
  test("It should fail for no costumer found with this _id", async () => {
    const { statusCode } =
      await TestHandler.invokeLambda<DeleteCustomersByCustomerIdApi.SuccessResponse>(
        deleteCustomersByCustomerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            customerId: new ObjectId().toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.NotFound);
  });
  test("It should delete test customer", async () => {
    let customers = await Customer.getList({}, { limit: 0 });
    expect(customers.length).toBe(1);
    const { statusCode } =
      await TestHandler.invokeLambda<DeleteCustomersByCustomerIdApi.SuccessResponse>(
        deleteCustomersByCustomerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            customerId: TDM.getCustomer()._id.toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    customers = await Customer.getList({}, { limit: 0 });
    expect(customers.length).toBe(0);
  });
  test("It should fail for no admin authenticated", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteCustomersByCustomerIdApi.SuccessResponse>(
        deleteCustomersByCustomerIdPath,
        {
          queryString: {
            customerId: TDM.getCustomer()._id.toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
});

afterAll(async () => {
  await closeDbConnection();
});
