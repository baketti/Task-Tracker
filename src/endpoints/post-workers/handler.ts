import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostWorkersApi } from "./interfaces";
import { ObjectId } from "mongodb";
import { User } from "@/models/server/User";
import { Worker } from "@/models/server/Worker";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PostWorkersApi.Request,
  res: NextApiResponse<PostWorkersApi.EndpointResponse>,
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
    const { fullName } = req.payload;

    const worker = await Worker.create(fullName);

    return ResponseHandler.json<PostWorkersApi.SuccessResponse>(res, {
      worker: worker.toClientVersion(),
      message: i18n.t("workers.name") + " " + i18n.t("generic.success"),
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
