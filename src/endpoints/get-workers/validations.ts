import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { GetWorkersApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<GetWorkersApi.QueryStringParameters> => ({});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
