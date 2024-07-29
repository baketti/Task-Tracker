import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PatchWorkersByWorkerIdApi } from "./interfaces";
import { Worker } from "@/models/server/Worker";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PatchWorkersByWorkerIdApi.Request,
  res: NextApiResponse<PatchWorkersByWorkerIdApi.EndpointResponse>,
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

    const { fullName, enabledJobIds, userId, isIntern, hours, startDate } =
      req.payload;

    await worker.patch({
      fullName: fullName ?? worker.fullName,
      enabledJobIds: enabledJobIds ?? worker.enabledJobIds,
      userId: userId ?? worker.userId,
      isIntern: isIntern ?? worker.isIntern,
      hours: isIntern ? hours ?? worker.hours : null,
      startDate: isIntern ? startDate ?? worker.startDate ?? null : null,
    });

    return ResponseHandler.json<PatchWorkersByWorkerIdApi.SuccessResponse>(
      res,
      {
        worker: worker.toClientVersion(),
        message: "Lavoratore aggiornato con successo",
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
