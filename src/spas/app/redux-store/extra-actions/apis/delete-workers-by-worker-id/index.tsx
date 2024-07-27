import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface DeleteWorkersByWorkerIdParams {
  workerId: ObjectIdFe;
}
export interface DeleteWorkersByWorkerIdResponseData {}
export default apiActionBuilder<
  DeleteWorkersByWorkerIdParams,
  ApiSuccessAction<
    DeleteWorkersByWorkerIdResponseData,
    DeleteWorkersByWorkerIdParams
  >,
  ApiFailAction<DeleteWorkersByWorkerIdParams>
>(
  "apis/workers/{workerId}/delete",
  (
    params: DeleteWorkersByWorkerIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<DeleteWorkersByWorkerIdParams>(
      {
        path: `/workers/${params.workerId}`,
        method: HttpMethod.DELETE,
      },
      options,
      params,
    ),
  }),
);
