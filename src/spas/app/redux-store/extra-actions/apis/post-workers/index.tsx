import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";
import { IWorkerFe } from "@/models/client/WorkerFe";
export interface PostWorkersParams {
  fullName: string;
  enabledJobIds?: ObjectIdFe[];
  userId?: ObjectIdFe;
  isIntern?: boolean;
  hours?: number;
  startDate?: string;
}
export interface PostWorkersResponseData {
  worker: IWorkerFe;
}
export default apiActionBuilder<
  PostWorkersParams,
  ApiSuccessAction<PostWorkersResponseData, PostWorkersParams>,
  ApiFailAction<PostWorkersParams>
>(
  "apis/workers/post",
  (params: PostWorkersParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<PostWorkersParams>(
      {
        path: "/workers",
        method: HttpMethod.POST,
        body: {
          fullName: params.fullName,
          enabledJobIds: params.enabledJobIds,
          userId: params.userId,
          isIntern: params.isIntern,
          hours: params.hours,
          startDate: params.startDate,
        },
      },
      options,
      params,
    ),
  }),
);
