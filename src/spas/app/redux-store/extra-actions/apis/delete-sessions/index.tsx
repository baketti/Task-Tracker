import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";

export interface DeleteSessionsParams {}
export interface DeleteSessionsResponseData {}
export default apiActionBuilder<
  DeleteSessionsParams,
  ApiSuccessAction<DeleteSessionsResponseData, DeleteSessionsParams>,
  ApiFailAction<DeleteSessionsParams>
>(
  "apis/sessions/delete",
  (
    params: DeleteSessionsParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<DeleteSessionsParams>(
      {
        path: "/sessions",
        method: HttpMethod.DELETE,
      },
      options,
      params,
    ),
  }),
);
