import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { GetProjectsApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<GetProjectsApi.QueryStringParameters> => ({});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
