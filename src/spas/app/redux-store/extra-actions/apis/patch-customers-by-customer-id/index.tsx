import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ICustomerFe } from "@/models/client/CustomerFe";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface PatchCustomersByCustomerIdParams {
  customerId: ObjectIdFe;
  name?: string;
  logoUrl?: string;
}
export interface PatchCustomersByCustomerIdResponseData {
  customer: ICustomerFe;
}
export default apiActionBuilder<
  PatchCustomersByCustomerIdParams,
  ApiSuccessAction<
    PatchCustomersByCustomerIdResponseData,
    PatchCustomersByCustomerIdParams
  >,
  ApiFailAction<PatchCustomersByCustomerIdParams>
>(
  "apis/customers/{customerId}/patch",
  (
    params: PatchCustomersByCustomerIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<PatchCustomersByCustomerIdParams>(
      {
        path: `/customers/${params.customerId}`,
        method: HttpMethod.PATCH,
        body: {
          name: params.name,
          logoUrl: params.logoUrl,
        },
      },
      options,
      params,
    ),
  }),
);
