import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { GetCustomersApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<GetCustomersApi.QueryStringParameters> => ({});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
