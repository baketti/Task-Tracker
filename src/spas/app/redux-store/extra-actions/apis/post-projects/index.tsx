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

export interface PostProjectsParams {
  name: string;
  customerId: ObjectIdFe;
  website?: string;
  intermediaryId?: ObjectIdFe;
}
export interface PostProjectsResponseData {
  project: IProjectFe;
}
export default apiActionBuilder<
  PostProjectsParams,
  ApiSuccessAction<PostProjectsResponseData, PostProjectsParams>,
  ApiFailAction<PostProjectsParams>
>(
  "apis/projects/post",
  (params: PostProjectsParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<PostProjectsParams>(
      {
        path: "/projects",
        method: HttpMethod.POST,
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
