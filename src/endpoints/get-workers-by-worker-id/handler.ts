import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { GetWorkersByWorkerIdApi } from "./interfaces";
import { ApisHelper } from "@/models/server/ApisHelper";
import { Worker } from "@/models/server/Worker";

export default async function handler(
  req: GetWorkersByWorkerIdApi.Request,
  res: NextApiResponse<GetWorkersByWorkerIdApi.EndpointResponse>,
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
      return ResponseHandler.json<ErrorResponse>(
        res, 
        {}, 
        StatusCodes.NotFound        
      );
    }

    return ResponseHandler.json<GetWorkersByWorkerIdApi.SuccessResponse>(res, {
      worker: worker.toClientVersion(),
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
