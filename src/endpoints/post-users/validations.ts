import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PostUsersApi } from "./interfaces";
import { UserRoles } from "@/models/common/UserCommon";

const queryStringParametersValidations =
  (): YupShapeByInterface<PostUsersApi.QueryStringParameters> => ({});

const payloadValidations = (): YupShapeByInterface<PostUsersApi.Payload> => ({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  role: yup.string().oneOf(Object.values(UserRoles)).required(),
});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
