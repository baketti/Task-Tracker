import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostJobsApi } from "./interfaces";
import { Job } from "@/models/server/Job";
import { ApisHelper } from "@/models/server/ApisHelper";
import { ObjectId } from "mongodb";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PostJobsApi.Request,
  res: NextApiResponse<PostJobsApi.EndpointResponse>,
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
    const { name, projectId, isActive } = payload;
    const job = await Job.create(name, isActive, projectId);

    return ResponseHandler.json<PostJobsApi.SuccessResponse>(res, {
      job: job.toClientVersion(),
      message: i18n.t("job.name") + " " + i18n.t("generic.success"),
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
