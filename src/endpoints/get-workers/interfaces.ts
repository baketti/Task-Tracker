import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IWorkerFe } from "@/models/client/WorkerFe";

export namespace GetWorkersApi {
  export type QueryStringParameters = {};

  export type SuccessResponse = {
    message?: string;
    workers: IWorkerFe[];
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
