import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IWorkerFe } from "@/models/client/WorkerFe";
import { ObjectId } from "mongodb";

export namespace GetWorkersByWorkerIdApi {
  export type QueryStringParameters = {
    workerId: ObjectId;
  };

  export type SuccessResponse = {
    message?: string;
    worker: IWorkerFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
