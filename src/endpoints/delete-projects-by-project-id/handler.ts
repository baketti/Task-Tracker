import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { DeleteProjectsByProjectIdApi } from "./interfaces";
import { ObjectId } from "mongodb";
import { User } from "@/models/server/User";
import { Project } from "@/models/server/Project";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: DeleteProjectsByProjectIdApi.Request,
  res: NextApiResponse<DeleteProjectsByProjectIdApi.EndpointResponse>,
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

    const { projectId } = queryStringParameters;

    const project = await Project.getById(projectId);

    if (!project) {
      return ResponseHandler.json<ErrorResponse>(res, {}, StatusCodes.NotFound);
    }

    await Project.delete(projectId);

    return ResponseHandler.json<DeleteProjectsByProjectIdApi.SuccessResponse>(
      res,
      {
        message: i18n.t("project.name") + " " + i18n.t("delete.success"),
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
