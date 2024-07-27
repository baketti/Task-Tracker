import { IProjectFe } from "@/models/client/ProjectFe";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface ProjectState {
  list: IProjectFe[];
  editProjectId: ObjectIdFe | null;
}
