import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PostWorkersApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PostWorkersApi.QueryStringParameters> => ({});

const payloadValidations = (): YupShapeByInterface<PostWorkersApi.Payload> => ({
  fullName: yup.string().min(5).required(),
  enabledJobIds: yup.array().of(yupObjectId()).nullable(),
  userId: yupObjectId().optional(),
  isIntern: yup.boolean().optional(),
  hours: yup.number().optional(),
  startDate: yup.date().nullable(),
});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
