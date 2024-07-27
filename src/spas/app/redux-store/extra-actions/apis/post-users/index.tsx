import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";

export interface PostUsersParams {
  email: string;
  password: string;
  role: string;
}
export interface PostUsersResponseData {
  message: string;
}
export default apiActionBuilder<
  PostUsersParams,
  ApiSuccessAction<PostUsersResponseData, PostUsersParams>,
  ApiFailAction<PostUsersParams>
>(
  "apis/users/post",
  (params: PostUsersParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<PostUsersParams>(
      {
        path: "/users",
        method: HttpMethod.POST,
        body: {
          email: params.email,
          password: params.password,
          role: params.role,
        },
      },
      options,
      params,
    ),
  }),
);
