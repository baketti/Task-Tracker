import { PatchCustomersByCustomerIdApi } from "@/endpoints/patch-customers-by-customer-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { TDM } from "@/lib/test-utils";
import { ObjectId } from "mongodb";
import { closeDbConnection } from "@/lib/mongodb";

const patchCustomersByCustomerIdPath = "patch-customers-by-customer-id";

beforeAll(async () => {
  await TDM.cleanDb();
  await TDM.createUser();
  await TDM.createCustomer();
});

describe("patchCustomersByCustomerId API", () => {
  test("It should fail for no payload specified", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchCustomersByCustomerIdApi.SuccessResponse>(
        patchCustomersByCustomerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.BadRequest);
  });
  test("It should fail for no costumer found with this _id", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchCustomersByCustomerIdApi.SuccessResponse>(
        patchCustomersByCustomerIdPath,
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
  test("It should update test customer name", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchCustomersByCustomerIdApi.SuccessResponse>(
        patchCustomersByCustomerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            customerId: TDM.getCustomer()._id.toHexString(),
          },
          payload: {
            name: TDM.getCustomer().name + "updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    expect(payload.customer.name).toBe(TDM.getCustomer().name + "updated");
  });
  test("It should update test customer logo", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchCustomersByCustomerIdApi.SuccessResponse>(
        patchCustomersByCustomerIdPath,
        {
          headers: {
            ...TDM.getCookieSession(),
          },
          queryString: {
            customerId: TDM.getCustomer()._id.toHexString(),
          },
          payload: {
            logoUrl: TDM.getCustomer().logoUrl + "updated",
          },
        },
      );
    console.log(payload);
    expect(statusCode).toBe(StatusCodes.OK);
    expect(payload.customer.logoUrl).toBe(
      TDM.getCustomer().logoUrl + "updated",
    );
  });
  test("It should fail for no admin authenticated", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchCustomersByCustomerIdApi.SuccessResponse>(
        patchCustomersByCustomerIdPath,
        {
          queryString: {
            customerId: TDM.getCustomer()._id.toHexString(),
          },
          payload: {
            name: TDM.getCustomer().name + "updated",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.Unauthorized);
  });
});
afterAll(async () => {
  await closeDbConnection();
});
