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

export interface PatchWorkersByWorkerIdParams {
  workerId?: ObjectIdFe;
  fullName?: string;
  enabledJobIds?: ObjectIdFe[];
  userId?: ObjectIdFe;
  isIntern?: boolean;
  hours?: number;
  startDate?: string;
}
export interface PatchWorkersByWorkerIdResponseData {
  worker: IWorkerFe;
}
export default apiActionBuilder<
  PatchWorkersByWorkerIdParams,
  ApiSuccessAction<
    PatchWorkersByWorkerIdResponseData,
    PatchWorkersByWorkerIdParams
  >,
  ApiFailAction<PatchWorkersByWorkerIdParams>
>(
  "apis/workers/{workerId}/patch",
  (
    params: PatchWorkersByWorkerIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<PatchWorkersByWorkerIdParams>(
      {
        path: `/workers/${params.workerId}`,
        method: HttpMethod.PATCH,
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
