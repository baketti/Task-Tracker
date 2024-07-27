import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";
import { IJobFe } from "@/models/client/JobFe";

export interface PostJobsParams {
  name: string;
  //income?: number;
  isActive?: boolean;
  projectId: ObjectIdFe;
}
export interface PostJobsResponseData {
  job: IJobFe;
}
export default apiActionBuilder<
  PostJobsParams,
  ApiSuccessAction<PostJobsResponseData, PostJobsParams>,
  ApiFailAction<PostJobsParams>
>(
  "apis/jobs/post",
  (params: PostJobsParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<PostJobsParams>(
      {
        path: "/jobs",
        method: HttpMethod.POST,
        body: {
          name: params.name,
          //income: params.income,
          isActive: params.isActive,
          projectId: params.projectId,
        },
      },
      options,
      params,
    ),
  }),
);
