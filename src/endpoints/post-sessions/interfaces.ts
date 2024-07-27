import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IUserFe, UserFe } from "@/models/client/UserFe";

export namespace PostSessionsApi {
  export type QueryStringParameters = {};

  export type Payload = {
    email: string;
    password: string;
  };

  export type SuccessResponse = {
    message?: string;
    user: IUserFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
