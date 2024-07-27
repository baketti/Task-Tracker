import { ICustomerFe } from "@/models/client/CustomerFe";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface CustomerState {
  list: ICustomerFe[];
  editCustomerId: ObjectIdFe | null;
}
