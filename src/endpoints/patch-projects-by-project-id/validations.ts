import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PatchProjectsByProjectIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PatchProjectsByProjectIdApi.QueryStringParameters> => ({
    projectId: yupObjectId().required(),
  });

const payloadValidations =
  (): YupShapeByInterface<PatchProjectsByProjectIdApi.Payload> => ({
    name: yup.string().min(3).optional(),
    customerId: yupObjectId().optional(),
    website: yup.string().url().optional().nullable(),
    intermediaryId: yupObjectId().optional().nullable(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
