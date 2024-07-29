import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostCustomersApi } from "./interfaces";
import { User } from "@/models/server/User";
import { ObjectId } from "mongodb";
import { Customer } from "@/models/server/Customer";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PostCustomersApi.Request,
  res: NextApiResponse<PostCustomersApi.EndpointResponse>,
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

    const { name, logoUrl } = req.payload;

    const customer = await Customer.create(name, logoUrl);

    return ResponseHandler.json<PostCustomersApi.SuccessResponse>(res, {
      customer: customer.toClientVersion(),
      message: "Cliente creato con successo",
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
