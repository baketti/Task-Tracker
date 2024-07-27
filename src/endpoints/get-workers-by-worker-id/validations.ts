import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { GetWorkersByWorkerIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<GetWorkersByWorkerIdApi.QueryStringParameters> => ({
    workerId: yupObjectId().required(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
