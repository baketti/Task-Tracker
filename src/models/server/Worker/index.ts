import { Filter, ObjectId, WithId } from "mongodb";
import mongoDao from "@/lib/mongodb/mongo-dao";

export type IWorker = {
  _id?: ObjectId;
  fullName: string;
  enabledJobIds?: ObjectId[];
  userId?: ObjectId;
  isIntern?: boolean;
  hours?: number;
  startDate?: Date;
  created: Date;
  v: number;
};
export class Worker implements WithId<IWorker> {
  _id: ObjectId;
  fullName: string;
  enabledJobIds?: ObjectId[];
  userId?: ObjectId;
  isIntern?: boolean;
  hours?: number;
  startDate?: Date;
  created: Date;
  v: number;

  static get collectionName() {
    return "workers";
  }

  constructor(iWorker: IWorker) {
    this.fromInterface(iWorker);
  }

  static async create(
    fullName: string,
    enabledJobIds?: ObjectId[],
    userId?: ObjectId,
    isIntern?: boolean,
    hours?: number,
    startDate?: Date,
  ): Promise<Worker | null> {
    const iWorker = await mongoDao.insertOne<IWorker>(Worker.collectionName, {
      fullName,
      enabledJobIds: enabledJobIds ?? [],
      userId: userId ?? null,
      isIntern: isIntern ?? null,
      hours: isIntern ? hours : null,
      startDate: isIntern ? startDate : null,
      created: new Date(),
      v: 1,
    });
    return iWorker ? new Worker(iWorker) : null;
  }

  static async getById(_id: ObjectId): Promise<Worker | null> {
    const iWorker = await mongoDao.findOne<IWorker>(Worker.collectionName, {
      _id,
    });
    return iWorker ? new Worker(iWorker) : null;
  }

  async patch(fields: Partial<IWorker>): Promise<void> {
    const result = await mongoDao.updateOne<IWorker>(
      Worker.collectionName,
      {
        _id: this._id,
      },
      {
        $set: fields,
      },
    );
    if (result.modifiedCount !== 1) {
      throw new Error("Patch op was not applied successfully");
    }
    await this.refresh();
  }

  static async delete(_id: ObjectId): Promise<void> {
    const result = await mongoDao.deleteOne<IWorker>(Worker.collectionName, {
      _id,
    });
    if (result.deletedCount !== 1) {
      throw new Error("Delete op was not applied successfully");
    }
  }

  static async getList(
    filter: Filter<IWorker> = {},
    {
      limit = 10,
      skip = 0,
      sort = [],
      projection = null,
    }: {
      limit?: number;
      skip?: number;
      sort?: {
        by: keyof IWorker;
        asc: boolean;
      }[];
      projection?: Document;
    } = {
      limit: 10,
      skip: 0,
      sort: [],
      projection: null,
    },
  ): Promise<Worker[]> {
    const iWorkers = await mongoDao.findMany<IWorker>(
      Worker.collectionName,
      filter,
      {
        limit,
        skip,
        sort: sort.length
          ? Object.fromEntries(sort.map((pair) => [pair.by, pair.asc ? 1 : -1]))
          : undefined,
        projection,
      },
    );
    return iWorkers.map((iWorker) => new Worker(iWorker));
  }

  toClientVersion() {
    return {
      _id: this._id.toHexString(),
      fullName: this.fullName,
      enabledJobIds: this.enabledJobIds?.map((id) => id.toHexString()) ?? [],
      userId: this.userId?.toHexString() ?? null,
      isIntern: this.isIntern ?? null,
      hours: this.hours ?? null,
      startDate: this.startDate?.toLocaleDateString() ?? null,
    };
  }

  static async deleteMany() {
    await mongoDao.deleteMany<IWorker>(Worker.collectionName, {});
  }
  /* Mostly for internal use */

  fromInterface(iWorker: IWorker) {
    if (!iWorker._id) {
      throw new Error("Interface object doesn't have an _id");
    }
    this._id = iWorker._id;
    this.fullName = iWorker.fullName;
    this.enabledJobIds = iWorker.enabledJobIds;
    this.userId = iWorker.userId;
    this.isIntern = iWorker.isIntern;
    this.hours = iWorker.hours;
    this.startDate = iWorker.startDate;
    this.created = iWorker.created;
    this.v = iWorker.v;
  }

  async refresh() {
    const iWorker = await mongoDao.findOne<IWorker>(Worker.collectionName, {
      _id: this._id,
    });
    if (iWorker) {
      this.fromInterface(iWorker);
    } else {
      throw new Error("Couldn't find document in DB");
    }
  }
}
