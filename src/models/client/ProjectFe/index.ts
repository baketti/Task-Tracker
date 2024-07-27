import { ObjectIdFe } from "@/models/common/JsUtility";
import { CustomerFe } from "@/models/client/CustomerFe";

export type IProjectFe = {
  _id?: ObjectIdFe;
  name: string;
  website?: string;
  customerId: ObjectIdFe;
  intermediaryId?: ObjectIdFe;
};

export class ProjectFe
  implements Omit<IProjectFe, "customerId" | "intermediaryId">
{
  _id?: ObjectIdFe;
  name: string;
  website?: string;
  customer: CustomerFe;
  intermediary?: CustomerFe | null;

  constructor(project: IProjectFe, customers: CustomerFe[]) {
    this._id = project._id;
    this.name = project.name;
    this.website = project.website;
    this.customer = customers.find(
      (customer) => customer._id === project.customerId,
    );
    this.intermediary =
      customers.find((customer) => customer._id === project.intermediaryId) ??
      null;
  }
}
