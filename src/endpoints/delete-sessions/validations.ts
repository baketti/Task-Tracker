import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteSessionsApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteSessionsApi.QueryStringParameters> => ({});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
