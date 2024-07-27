import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";
import { ICustomerFe } from "@/models/client/CustomerFe";

export namespace PatchCustomersByCustomerIdApi {
  export type QueryStringParameters = {
    customerId: ObjectId;
  };

  export type Payload = {
    name?: string;
    logoUrl?: string;
  };

  export type SuccessResponse = {
    message?: string;
    customer: ICustomerFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
