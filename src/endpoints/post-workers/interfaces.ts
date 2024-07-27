import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IWorkerFe } from "@/models/client/WorkerFe";
import { ObjectId } from "mongodb";

export namespace PostWorkersApi {
  export type QueryStringParameters = {};

  export type Payload = {
    fullName: string;
    enabledJobIds?: ObjectId[];
    userId?: ObjectId;
    isIntern?: boolean;
    hours?: number;
    startDate?: Date;
  };

  export type SuccessResponse = {
    message?: string;
    worker: IWorkerFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
