import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PostCustomersApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<PostCustomersApi.QueryStringParameters> => ({});

const payloadValidations =
  (): YupShapeByInterface<PostCustomersApi.Payload> => ({
    name: yup.string().min(3).required(),
    logoUrl: yup.string().optional(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
