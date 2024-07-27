import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";
import { IWorkerFe } from "@/models/client/WorkerFe";

export namespace PatchWorkersByWorkerIdApi {
  export type QueryStringParameters = {
    workerId: ObjectId;
  };

  export type Payload = {
    fullName?: string;
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
