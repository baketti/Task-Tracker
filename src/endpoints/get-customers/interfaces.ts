import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ICustomerFe } from "@/models/client/CustomerFe";

export namespace GetCustomersApi {
  export type QueryStringParameters = {};

  export type SuccessResponse = {
    message?: string;
    customers: ICustomerFe[];
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
