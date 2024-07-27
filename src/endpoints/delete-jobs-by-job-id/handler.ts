import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { DeleteJobsByJobIdApi } from "./interfaces";
import { Job } from "@/models/server/Job";
import { ObjectId } from "mongodb";
import { User } from "@/models/server/User";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: DeleteJobsByJobIdApi.Request,
  res: NextApiResponse<DeleteJobsByJobIdApi.EndpointResponse>,
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

    const { jobId } = queryStringParameters;

    const job = await Job.getById(jobId);

    if (!job) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        {},
        StatusCodes.BadRequest,
      );
    }

    await Job.delete(jobId);

    return ResponseHandler.json<DeleteJobsByJobIdApi.SuccessResponse>(res, {
      message: i18n.t("job.name") + " " + i18n.t("delete.success"),
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
