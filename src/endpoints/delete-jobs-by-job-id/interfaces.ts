import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";

export namespace DeleteJobsByJobIdApi {
  export type QueryStringParameters = {
    jobId: ObjectId;
  };

  export type SuccessResponse = {
    message?: string;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
