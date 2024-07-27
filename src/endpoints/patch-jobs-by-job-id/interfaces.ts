import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";
import { IJobFe } from "@/models/client/JobFe";

export namespace PatchJobsByJobIdApi {
  export type QueryStringParameters = {
    jobId: ObjectId;
  };

  export type Payload = {
    name?: string;
    //income?: number;
    isActive?: boolean;
    projectId?: ObjectId;
  };

  export type SuccessResponse = {
    message?: string;
    job: IJobFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
