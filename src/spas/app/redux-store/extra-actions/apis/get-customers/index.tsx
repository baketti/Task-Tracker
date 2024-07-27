import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ICustomerFe } from "@/models/client/CustomerFe";

export interface GetCustomersParams {}
export interface GetCustomersResponseData {
  customers: ICustomerFe[];
}
export default apiActionBuilder<
  GetCustomersParams,
  ApiSuccessAction<GetCustomersResponseData, GetCustomersParams>,
  ApiFailAction<GetCustomersParams>
>(
  "apis/customers/get",
  (params: GetCustomersParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<GetCustomersParams>(
      {
        path: "/customers",
        method: HttpMethod.GET,
      },
      options,
      params,
    ),
  }),
);
