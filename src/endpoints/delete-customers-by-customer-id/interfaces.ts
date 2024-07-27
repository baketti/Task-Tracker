import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";

export namespace DeleteCustomersByCustomerIdApi {
  export type QueryStringParameters = {
    customerId: ObjectId;
  };

  export type SuccessResponse = {
    message?: string;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
