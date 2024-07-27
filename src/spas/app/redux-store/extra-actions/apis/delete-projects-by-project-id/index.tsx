import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface DeleteProjectsByProjectIdParams {
  projectId: ObjectIdFe;
}
export interface DeleteProjectsByProjectIdResponseData {}
export default apiActionBuilder<
  DeleteProjectsByProjectIdParams,
  ApiSuccessAction<
    DeleteProjectsByProjectIdResponseData,
    DeleteProjectsByProjectIdParams
  >,
  ApiFailAction<DeleteProjectsByProjectIdParams>
>(
  "apis/projects/{projectId}/delete",
  (
    params: DeleteProjectsByProjectIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<DeleteProjectsByProjectIdParams>(
      {
        path: `/projects/${params.projectId}`,
        method: HttpMethod.DELETE,
      },
      options,
      params,
    ),
  }),
);
