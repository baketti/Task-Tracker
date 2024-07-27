import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteWorkersByWorkerIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteWorkersByWorkerIdApi.QueryStringParameters> => ({
    workerId: yupObjectId().required(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
