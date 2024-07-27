import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";
import { IProjectFe } from "@/models/client/ProjectFe";

export namespace PatchProjectsByProjectIdApi {
  export type QueryStringParameters = {
    projectId: ObjectId;
  };

  export type Payload = {
    name?: string;
    customerId?: ObjectId;
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
