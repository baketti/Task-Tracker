import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IJobFe } from "@/models/client/JobFe";

export namespace GetJobsApi {
  export type QueryStringParameters = {};

  export type SuccessResponse = {
    message?: string;
    jobs: IJobFe[];
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
