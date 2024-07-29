import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostSessionsApi } from "./interfaces";
import { User } from "@/models/server/User";
import { i18n } from "@/translations/i18nextSetup";

export default async function handler(
  req: PostSessionsApi.Request,
  res: NextApiResponse<PostSessionsApi.EndpointResponse>,
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
    const { email, password } = payload;

    const user = await User.getByCredentials(email, password);

    if (!user) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: "Credenziali invalide" },
        StatusCodes.Unauthorized,
      );
    }

    originalReq.session.user = {
      isLoggedIn: true,
      userId: user._id.toHexString(),
    };

    await originalReq.session.save();

    return ResponseHandler.json<PostSessionsApi.SuccessResponse>(res, {
      message: "Login effettuato con successo",
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
