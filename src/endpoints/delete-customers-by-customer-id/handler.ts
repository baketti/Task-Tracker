import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { DeleteCustomersByCustomerIdApi } from "./interfaces";
import { ObjectId } from "mongodb";
import { User } from "@/models/server/User";
import { Customer } from "@/models/server/Customer";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: DeleteCustomersByCustomerIdApi.Request,
  res: NextApiResponse<DeleteCustomersByCustomerIdApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters } = req;

    const { success, response } = await ApisHelper.onlyAdmins(
      res,
      originalReq,
      validationResult,
    );
    if (!success) {
      return response;
    }

    const { customerId } = queryStringParameters;

    const customer = await Customer.getById(customerId);

    if (!customer) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: "Customer not found" },
        StatusCodes.NotFound,
      );
    }

    await Customer.delete(customerId);

    return ResponseHandler.json<DeleteCustomersByCustomerIdApi.SuccessResponse>(
      res,
      {
        message: "Cliente eliminato",
      },
    );
  } catch (e) {
    console.error(e);
    return ResponseHandler.json<ErrorResponse>(
      res,
      { message: "Internal error" },
      StatusCodes.InternalServerError,
    );
  }
}
