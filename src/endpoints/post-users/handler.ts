import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostUsersApi } from "./interfaces";
import { User } from "@/models/server/User";
import { UserRoles } from "@/models/common/UserCommon";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PostUsersApi.Request,
  res: NextApiResponse<PostUsersApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters, payload } = req;

    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }

    const { email, password, role } = payload;

    await User.create(email, password, role as UserRoles);

    return ResponseHandler.json<PostUsersApi.SuccessResponse>(res, {
      message: "Utente creato con successo",
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
