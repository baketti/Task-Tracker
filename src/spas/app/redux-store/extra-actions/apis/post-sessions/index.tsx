import { IUserFe } from "@/models/client/UserFe";
import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";

export interface PostSessionsParams {
  email: string;
  password: string;
}
export interface PostSessionsResponseData {
  message?: string;
  user: IUserFe;
}

export default apiActionBuilder<
  PostSessionsParams,
  ApiSuccessAction<PostSessionsResponseData, PostSessionsParams>,
  ApiFailAction<PostSessionsParams>
>(
  "apis/sessions/post",
  (params: PostSessionsParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<PostSessionsParams>(
      {
        path: "/sessions",
        method: HttpMethod.POST,
        body: {
          email: params.email,
          password: params.password,
        },
      },
      options,
      params,
    ),
  }),
);
