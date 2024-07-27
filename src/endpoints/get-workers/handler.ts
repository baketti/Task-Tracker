import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { GetWorkersApi } from "./interfaces";
import { Worker } from "@/models/server/Worker";
export default async function handler(
  req: GetWorkersApi.Request,
  res: NextApiResponse<GetWorkersApi.EndpointResponse>,
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

    const workers = await Worker.getList({}, { limit: 0 });

    return ResponseHandler.json<GetWorkersApi.SuccessResponse>(res, {
      workers: workers.map((worker) => worker.toClientVersion()),
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
