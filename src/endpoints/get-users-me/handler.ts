import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { GetUsersMeApi } from "./interfaces";
import { User } from "@/models/server/User";
import { ObjectId } from "mongodb";

export default async function handler(
  req: GetUsersMeApi.Request,
  res: NextApiResponse<GetUsersMeApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters } = req;

    if (!originalReq.session.user) {
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

    const userId = new ObjectId(originalReq.session.user.userId);
    const user = await User.getById(userId);

    if (!user) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: "User not found" },
        StatusCodes.InternalServerError,
      );
    }
    if (user.role == "admin") {
    } else {
    }
    return ResponseHandler.json<GetUsersMeApi.SuccessResponse>(res, {
      user: user.toClientVersion(),
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
