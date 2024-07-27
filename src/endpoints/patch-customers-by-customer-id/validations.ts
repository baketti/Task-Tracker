import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PatchCustomersByCustomerIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PatchCustomersByCustomerIdApi.QueryStringParameters> => ({
    customerId: yupObjectId().required(),
  });

const payloadValidations =
  (): YupShapeByInterface<PatchCustomersByCustomerIdApi.Payload> => ({
    name: yup.string().min(3).optional(),
    logoUrl: yup.string().optional(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
