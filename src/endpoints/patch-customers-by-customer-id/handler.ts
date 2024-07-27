import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PatchCustomersByCustomerIdApi } from "./interfaces";
import { User } from "@/models/server/User";
import { ObjectId } from "mongodb";
import { Customer } from "@/models/server/Customer";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PatchCustomersByCustomerIdApi.Request,
  res: NextApiResponse<PatchCustomersByCustomerIdApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters, payload } = req;

    const { success, response } = await ApisHelper.onlyAdmins(
      res,
      originalReq,
      validationResult,
    );
    if (!success) {
      return response;
    }

    const { name, logoUrl } = payload;
    const { customerId } = queryStringParameters;

    const customer = await Customer.getById(customerId);

    if (!customer) {
      return ResponseHandler.json<ErrorResponse>(res, {}, StatusCodes.NotFound);
    }

    await customer.patch({
      name: name ?? customer.name,
      logoUrl: logoUrl ?? customer.logoUrl,
    });

    return ResponseHandler.json<PatchCustomersByCustomerIdApi.SuccessResponse>(
      res,
      {
        customer: customer.toClientVersion(),
        message: i18n.t("customers.name") + " " + i18n.t("patch.success"),
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
