import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IJobFe } from "@/models/client/JobFe";
import { ObjectId } from "mongodb";

export namespace PostJobsApi {
  export type QueryStringParameters = {};

  export type Payload = {
    name: string;
    //income?: number;
    isActive?: boolean;
    projectId: ObjectId;
  };

  export type SuccessResponse = {
    message?: string;
    job: IJobFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
