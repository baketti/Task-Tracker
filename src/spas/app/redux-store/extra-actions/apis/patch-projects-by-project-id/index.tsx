import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";
import { IProjectFe } from "@/models/client/ProjectFe";

export interface PatchProjectsByProjectIdParams {
  projectId: ObjectIdFe;
  name?: string;
  customerId?: ObjectIdFe;
  website?: string;
  intermediaryId?: ObjectIdFe;
}
export interface PatchProjectsByProjectIdResponseData {
  project: IProjectFe;
}
export default apiActionBuilder<
  PatchProjectsByProjectIdParams,
  ApiSuccessAction<
    PatchProjectsByProjectIdResponseData,
    PatchProjectsByProjectIdParams
  >,
  ApiFailAction<PatchProjectsByProjectIdParams>
>(
  "apis/projects/{projectId}/patch",
  (
    params: PatchProjectsByProjectIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<PatchProjectsByProjectIdParams>(
      {
        path: `/projects/${params.projectId}`,
        method: HttpMethod.PATCH,
        body: {
          name: params.name,
          customerId: params.customerId,
          website: params.website,
          intermediaryId: params.intermediaryId,
        },
      },
      options,
      params,
    ),
  }),
);
