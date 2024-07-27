import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteProjectsByProjectIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteProjectsByProjectIdApi.QueryStringParameters> => ({
    projectId: yupObjectId().required(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
