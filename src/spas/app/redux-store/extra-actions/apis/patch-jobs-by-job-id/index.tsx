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

export interface PatchJobsByJobIdParams {
  jobId: ObjectIdFe;
  name?: string;
  //income?: number;
  isActive?: boolean;
  projectId?: ObjectIdFe;
}
export interface PatchJobsByJobIdResponseData {
  job: IJobFe;
}
export default apiActionBuilder<
  PatchJobsByJobIdParams,
  ApiSuccessAction<PatchJobsByJobIdResponseData, PatchJobsByJobIdParams>,
  ApiFailAction<PatchJobsByJobIdParams>
>(
  "apis/jobs/{jobId}/patch",
  (
    params: PatchJobsByJobIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<PatchJobsByJobIdParams>(
      {
        path: `/jobs/${params.jobId}`,
        method: HttpMethod.PATCH,
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
