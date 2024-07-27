import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PatchProjectsByProjectIdApi } from "./interfaces";
import { ObjectId } from "mongodb";
import { Project } from "@/models/server/Project";
import { ApisHelper } from "@/models/server/ApisHelper";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PatchProjectsByProjectIdApi.Request,
  res: NextApiResponse<PatchProjectsByProjectIdApi.EndpointResponse>,
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
    const project = await Project.getById(new ObjectId(projectId));
    if (!project) {
      return ResponseHandler.json<ErrorResponse>(res, {}, StatusCodes.NotFound);
    }

    const { name, website, customerId, intermediaryId } = req.payload;

    await project.patch({
      name: name ?? project.name,
      customerId: customerId ?? project.customerId,
      website: website ?? project.website,
      intermediaryId: intermediaryId ?? project.intermediaryId,
    });

    return ResponseHandler.json<PatchProjectsByProjectIdApi.SuccessResponse>(
      res,
      {
        project: project.toClientVersion(),
        message: i18n.t("project.name") + " " + i18n.t("patch.success"),
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
