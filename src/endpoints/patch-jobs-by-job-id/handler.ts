import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PatchJobsByJobIdApi } from "./interfaces";
import { Job } from "@/models/server/Job";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PatchJobsByJobIdApi.Request,
  res: NextApiResponse<PatchJobsByJobIdApi.EndpointResponse>,
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

    const { jobId } = queryStringParameters;
    const job = await Job.getById(jobId);
    if (!job) {
      return ResponseHandler.json<ErrorResponse>(res, {}, StatusCodes.NotFound);
    }

    const { name, projectId, isActive } = payload;

    await job.patch({
      name: name ?? job.name,
      //income: income ?? job.income,
      isActive: isActive ?? job.isActive,
      projectId: projectId ?? job.projectId,
    });

    return ResponseHandler.json<PatchJobsByJobIdApi.SuccessResponse>(res, {
      job: job.toClientVersion(),
      message: i18n.t("job.name") + " " + i18n.t("patch.success"),
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
