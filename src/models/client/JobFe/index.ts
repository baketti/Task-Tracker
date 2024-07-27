import { ObjectIdFe } from "@/models/common/JsUtility";
import { ProjectFe } from "@/models/client/ProjectFe";
import { CustomerFe } from "@/models/client/CustomerFe";

export type IJobFe = {
  _id?: ObjectIdFe;
  name: string;
  isActive?: boolean;
  projectId: ObjectIdFe;
};

export class JobFe implements Omit<IJobFe, "projectId"> {
  _id?: ObjectIdFe;
  name: string;
  isActive?: boolean;
  project: ProjectFe;
  customer: CustomerFe;

  constructor(job: IJobFe, projects: ProjectFe[]) {
    this._id = job._id;
    this.name = job.name;
    this.isActive = job.isActive;
    this.project = projects.find((project) => project._id === job.projectId);
    this.customer = this.project?.customer;
  }
}
