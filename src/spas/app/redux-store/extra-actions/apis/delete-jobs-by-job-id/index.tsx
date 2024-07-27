import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface DeleteJobsByJobIdParams {
  jobId: ObjectIdFe;
}
export interface DeleteJobsByJobIdResponseData {}
export default apiActionBuilder<
  DeleteJobsByJobIdParams,
  ApiSuccessAction<DeleteJobsByJobIdResponseData, DeleteJobsByJobIdParams>,
  ApiFailAction<DeleteJobsByJobIdParams>
>(
  "apis/jobs/{jobId}/delete",
  (
    params: DeleteJobsByJobIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<DeleteJobsByJobIdParams>(
      {
        path: `/jobs/${params.jobId}`,
        method: HttpMethod.DELETE,
      },
      options,
      params,
    ),
  }),
);
