import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { GetJobsApi } from "./interfaces";
import { Job } from "@/models/server/Job";

export default async function handler(
  req: GetJobsApi.Request,
  res: NextApiResponse<GetJobsApi.EndpointResponse>,
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

    const jobs = await Job.getList({}, { limit: 0 });

    return ResponseHandler.json<GetJobsApi.SuccessResponse>(res, {
      jobs: jobs.map((job) => job.toClientVersion()),
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
