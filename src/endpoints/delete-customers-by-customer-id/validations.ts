import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteCustomersByCustomerIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteCustomersByCustomerIdApi.QueryStringParameters> => ({
    customerId: yupObjectId().required(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
