import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { GetJobsApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<GetJobsApi.QueryStringParameters> => ({});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
