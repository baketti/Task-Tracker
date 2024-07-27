import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { IWorkerFe } from "@/models/client/WorkerFe";

export interface GetWorkersParams {}
export interface GetWorkersResponseData {
  workers: IWorkerFe[];
}
export default apiActionBuilder<
  GetWorkersParams,
  ApiSuccessAction<GetWorkersResponseData, GetWorkersParams>,
  ApiFailAction<GetWorkersParams>
>(
  "apis/workers/get",
  (params: GetWorkersParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<GetWorkersParams>(
      {
        path: "/workers",
        method: HttpMethod.GET,
      },
      options,
      params,
    ),
  }),
);
