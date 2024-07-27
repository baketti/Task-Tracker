import { IJobFe } from "@/models/client/JobFe";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface JobState {
  list: IJobFe[];
  editJobId: ObjectIdFe | null;
}
