import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { DeleteWorkersByWorkerIdApi } from "./interfaces";
import { User } from "@/models/server/User";
import { ObjectId } from "mongodb";
import { Worker } from "@/models/server/Worker";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: DeleteWorkersByWorkerIdApi.Request,
  res: NextApiResponse<DeleteWorkersByWorkerIdApi.EndpointResponse>,
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

    const { workerId } = queryStringParameters;

    const worker = await Worker.getById(workerId);

    if (!worker) {
      return ResponseHandler.json<ErrorResponse>(res, {}, StatusCodes.NotFound);
    }

    await Worker.delete(workerId);

    return ResponseHandler.json<DeleteWorkersByWorkerIdApi.SuccessResponse>(
      res,
      {
        message: i18n.t("workers.name") + " " + i18n.t("delete.success"),
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
