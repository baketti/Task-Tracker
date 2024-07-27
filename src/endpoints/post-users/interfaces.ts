import { ErrorResponse, RequestI } from "@/lib/response-handler";

export namespace PostUsersApi {
  export type QueryStringParameters = {};

  export type Payload = {
    email: string;
    password: string;
    role: string;
  };

  export type SuccessResponse = {
    message?: string;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
