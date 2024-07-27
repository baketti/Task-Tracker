import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PostProjectsApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PostProjectsApi.QueryStringParameters> => ({});

const payloadValidations =
  (): YupShapeByInterface<PostProjectsApi.Payload> => ({
    name: yup.string().min(3).required(),
    customerId: yupObjectId().required(),
    website: yup.string().url().optional().nullable(),
    intermediaryId: yupObjectId().optional().nullable(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
