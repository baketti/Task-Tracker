import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";

export namespace DeleteWorkersByWorkerIdApi {
  export type QueryStringParameters = {
    workerId: ObjectId;
  };

  export type SuccessResponse = {
    message?: string;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
