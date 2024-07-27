import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ICustomerFe } from "@/models/client/CustomerFe";

export interface PostCustomersParams {
  name: string;
  logoUrl?: string;
}
export interface PostCustomersResponseData {
  customer: ICustomerFe;
}
export default apiActionBuilder<
  PostCustomersParams,
  ApiSuccessAction<PostCustomersResponseData, PostCustomersParams>,
  ApiFailAction<PostCustomersParams>
>(
  "apis/customers/post",
  (params: PostCustomersParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<PostCustomersParams>(
      {
        path: "/customers",
        method: HttpMethod.POST,
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
