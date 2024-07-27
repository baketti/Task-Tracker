import { ObjectIdFe } from "@/models/common/JsUtility";

export type IWorkerFe = {
  _id?: ObjectIdFe;
  fullName: string;
  enabledJobIds?: ObjectIdFe[];
  userId?: ObjectIdFe;
  isIntern?: boolean;
  hours?: number;
  startDate?: string;
};

export class WorkerFe implements IWorkerFe {
  id?: ObjectIdFe;
  fullName: string;
  enabledJobIds?: ObjectIdFe[];
  userId?: ObjectIdFe;
  isIntern?: boolean;
  hours?: number;
  startDate?: string;

  constructor(worker: IWorkerFe) {
    this.id = worker._id;
    this.fullName = worker.fullName;
    this.enabledJobIds = worker.enabledJobIds ?? [];
    this.userId = worker.userId ?? null;
    this.isIntern = worker.isIntern ?? null;
    this.hours = worker.hours ?? null;
    this.startDate = worker.startDate ?? null;
  }
}
