import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface DeleteCustomersByCustomerIdParams {
  customerId: ObjectIdFe;
}
export interface DeleteCustomersByCustomerIdResponseData {}
export default apiActionBuilder<
  DeleteCustomersByCustomerIdParams,
  ApiSuccessAction<
    DeleteCustomersByCustomerIdResponseData,
    DeleteCustomersByCustomerIdParams
  >,
  ApiFailAction<DeleteCustomersByCustomerIdParams>
>(
  "apis/customers/{customerId}/delete",
  (
    params: DeleteCustomersByCustomerIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<DeleteCustomersByCustomerIdParams>(
      {
        path: `/customers/${params.customerId}`,
        method: HttpMethod.DELETE,
      },
      options,
      params,
    ),
  }),
);
