import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteJobsByJobIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteJobsByJobIdApi.QueryStringParameters> => ({
    jobId: yupObjectId().required(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
