import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { IJobFe } from "@/models/client/JobFe";

export interface GetJobsParams {}
export interface GetJobsResponseData {
  jobs: IJobFe[];
}
export default apiActionBuilder<
  GetJobsParams,
  ApiSuccessAction<GetJobsResponseData, GetJobsParams>,
  ApiFailAction<GetJobsParams>
>(
  "apis/jobs/get",
  (params: GetJobsParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<GetJobsParams>(
      {
        path: "/jobs",
        method: HttpMethod.GET,
      },
      options,
      params,
    ),
  }),
);
