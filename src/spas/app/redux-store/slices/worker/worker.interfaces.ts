import { IWorkerFe } from "@/models/client/WorkerFe";
import { ObjectIdFe } from "@/models/common/JsUtility";

export interface WorkerState {
  list: IWorkerFe[];
  editWorkerId: ObjectIdFe | null;
  current: IWorkerFe;
}
