import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { GetUsersMeApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<GetUsersMeApi.QueryStringParameters> => ({});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
