import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PatchWorkersByWorkerIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PatchWorkersByWorkerIdApi.QueryStringParameters> => ({
    workerId: yupObjectId().required(),
  });

const payloadValidations =
  (): YupShapeByInterface<PatchWorkersByWorkerIdApi.Payload> => ({
    fullName: yup.string().min(3).optional(),
    enabledJobIds: yup.array().nullable().of(yupObjectId()),
    userId: yupObjectId().nullable(),
    isIntern: yup.boolean().optional(),
    hours: yup.number().nullable(),
    startDate: yup.date().nullable(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
