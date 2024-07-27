import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IUserFe } from "@/models/client/UserFe";

export namespace GetUsersMeApi {
  export type QueryStringParameters = {};

  export type SuccessResponse = {
    message?: string;
    user: IUserFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
