import { ObjectId } from "mongodb";
import { ObjectIdFe } from "@/models/common/JsUtility";

export type ICustomerFe = {
  _id?: ObjectIdFe;
  name: string;
  logoUrl?: string;
};

export class CustomerFe implements ICustomerFe {
  _id?: ObjectIdFe;
  name: string;
  logoUrl?: string;

  constructor(customer: ICustomerFe) {
    this._id = customer._id;
    this.name = customer.name;
    this.logoUrl = customer.logoUrl;
  }
}
