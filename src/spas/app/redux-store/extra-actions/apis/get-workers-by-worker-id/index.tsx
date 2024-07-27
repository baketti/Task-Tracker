import { IWorkerFe } from "@/models/client/WorkerFe";
import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface GetWorkersByWorkerIdParams {
  workerId: ObjectIdFe;
}
export interface GetWorkersByWorkerIdResponseData {
  worker: IWorkerFe;
}
export default apiActionBuilder<
  GetWorkersByWorkerIdParams,
  ApiSuccessAction<
    GetWorkersByWorkerIdResponseData,
    GetWorkersByWorkerIdParams
  >,
  ApiFailAction<GetWorkersByWorkerIdParams>
>(
  "apis/workers/{workerId}/get",
  (
    params: GetWorkersByWorkerIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<GetWorkersByWorkerIdParams>(
      {
        path: `/workers/${params.workerId}`,
        method: HttpMethod.GET,
      },
      options,
      params,
    ),
  }),
);
