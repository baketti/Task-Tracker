import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PostJobsApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PostJobsApi.QueryStringParameters> => ({});

const payloadValidations = (): YupShapeByInterface<PostJobsApi.Payload> => ({
  name: yup.string().min(3).required(),
  //income: yup.number().positive().optional(),
  isActive: yup.boolean().optional(),
  projectId: yupObjectId().required(),
});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
