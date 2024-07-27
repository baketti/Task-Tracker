import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IProjectFe } from "@/models/client/ProjectFe";
import { ObjectId } from "mongodb";

export namespace PostProjectsApi {
  export type QueryStringParameters = {};

  export type Payload = {
    name: string;
    customerId: ObjectId;
    website?: string;
    intermediaryId?: ObjectId;
  };

  export type SuccessResponse = {
    message?: string;
    project: IProjectFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
