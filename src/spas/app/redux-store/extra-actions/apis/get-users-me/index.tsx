import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";

export interface GetUsersMeParams {}
export interface GetUsersMeResponseData {}
export default apiActionBuilder<
  GetUsersMeParams,
  ApiSuccessAction<GetUsersMeResponseData, GetUsersMeParams>,
  ApiFailAction<GetUsersMeParams>
>(
  "apis/users/me/get",
  (params: GetUsersMeParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<GetUsersMeParams>(
      {
        path: "/users/me",
        method: HttpMethod.GET,
      },
      options,
      params,
    ),
  }),
);
