import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IProjectFe } from "@/models/client/ProjectFe";

export namespace GetProjectsApi {
  export type QueryStringParameters = {};

  export type SuccessResponse = {
    message?: string;
    projects: IProjectFe[];
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
