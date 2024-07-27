import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ICustomerFe } from "@/models/client/CustomerFe";

export namespace PostCustomersApi {
  export type QueryStringParameters = {};

  export type Payload = {
    name: string;
    logoUrl?: string;
  };

  export type SuccessResponse = {
    message?: string;
    customer: ICustomerFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;
  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
