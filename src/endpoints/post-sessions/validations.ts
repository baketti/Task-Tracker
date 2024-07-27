import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PostSessionsApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<PostSessionsApi.QueryStringParameters> => ({});

const payloadValidations =
  (): YupShapeByInterface<PostSessionsApi.Payload> => ({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
