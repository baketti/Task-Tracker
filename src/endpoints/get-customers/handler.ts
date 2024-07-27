import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { GetCustomersApi } from "./interfaces";
import { Customer } from "@/models/server/Customer";

export default async function handler(
  req: GetCustomersApi.Request,
  res: NextApiResponse<GetCustomersApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters } = req;

    if (!originalReq?.session?.user) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        {},
        StatusCodes.Unauthorized,
      );
    }

    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }

    const customers = await Customer.getList({}, { limit: 0 });

    return ResponseHandler.json<GetCustomersApi.SuccessResponse>(res, {
      customers: customers.map((customer) => customer.toClientVersion()),
    });
  } catch (e) {
    console.error(e);
    return ResponseHandler.json<ErrorResponse>(
      res,
      { message: "Internal error" },
      StatusCodes.InternalServerError,
    );
  }
}
