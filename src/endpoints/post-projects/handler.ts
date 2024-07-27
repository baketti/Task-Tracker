import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostProjectsApi } from "./interfaces";
import { Project } from "@/models/server/Project";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PostProjectsApi.Request,
  res: NextApiResponse<PostProjectsApi.EndpointResponse>,
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

    const { name, website, customerId, intermediaryId } = payload;

    const project = await Project.create(
      name,
      customerId,
      website,
      intermediaryId,
    );

    return ResponseHandler.json<PostProjectsApi.SuccessResponse>(res, {
      project: project.toClientVersion(),
      message: i18n.t("project.name") + " " + i18n.t("generic.success"),
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
