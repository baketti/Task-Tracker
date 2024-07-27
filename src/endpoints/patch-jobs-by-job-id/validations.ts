import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PatchJobsByJobIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PatchJobsByJobIdApi.QueryStringParameters> => ({
    jobId: yupObjectId().required(),
  });

const payloadValidations =
  (): YupShapeByInterface<PatchJobsByJobIdApi.Payload> => ({
    name: yup.string().min(3).optional(),
    //income: yup.number().positive().optional(),
    isActive: yup.boolean().optional(),
    projectId: yupObjectId().optional(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
