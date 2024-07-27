import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { GetProjectsApi } from "./interfaces";
import { Project } from "@/models/server/Project";

export default async function handler(
  req: GetProjectsApi.Request,
  res: NextApiResponse<GetProjectsApi.EndpointResponse>,
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

    const projects = await Project.getList({}, { limit: 0 });

    return ResponseHandler.json<GetProjectsApi.SuccessResponse>(res, {
      projects: projects.map((project) => project.toClientVersion()),
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
