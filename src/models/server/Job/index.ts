import { Filter, ObjectId, WithId } from "mongodb";
import mongoDao from "@/lib/mongodb/mongo-dao";
import { IJobFe } from "@/models/client/JobFe";

export type IJob = {
  _id?: ObjectId;
  name: string;
  isActive?: boolean;
  projectId: ObjectId;
  created: Date;
  v: number;
};

export class Job implements WithId<IJob> {
  _id: ObjectId;
  name: string;
  isActive?: boolean;
  projectId: ObjectId;
  created: Date;
  v: number;

  static get collectionName() {
    return "jobs";
  }

  constructor(iJob: IJob) {
    this.fromInterface(iJob);
  }

  static async create(
    name: string,
    isActive: boolean,
    projectId: ObjectId,
  ): Promise<Job | null> {
    const iJob = await mongoDao.insertOne<IJob>(Job.collectionName, {
      name,
      isActive: isActive ?? false,
      projectId,
      created: new Date(),
      v: 1,
    });
    return iJob ? new Job(iJob) : null;
  }

  static async getById(_id: ObjectId): Promise<Job | null> {
    const iJob = await mongoDao.findOne<IJob>(Job.collectionName, {
      _id,
    });
    return iJob ? new Job(iJob) : null;
  }

  async patch(fields: Partial<IJob>): Promise<void> {
    const result = await mongoDao.updateOne<IJob>(
      Job.collectionName,
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
    const result = await mongoDao.deleteOne<IJob>(Job.collectionName, {
      _id,
    });
    if (result.deletedCount !== 1) {
      throw new Error("Delete op was not applied successfully");
    }
  }

  static async getList(
    filter: Filter<IJob> = {},
    {
      limit = 10,
      skip = 0,
      sort = [],
      projection = null,
    }: {
      limit?: number;
      skip?: number;
      sort?: {
        by: keyof IJob;
        asc: boolean;
      }[];
      projection?: Document;
    } = {
      limit: 10,
      skip: 0,
      sort: [],
      projection: null,
    },
  ): Promise<Job[]> {
    const iJobs = await mongoDao.findMany<IJob>(Job.collectionName, filter, {
      limit,
      skip,
      sort: sort.length
        ? Object.fromEntries(sort.map((pair) => [pair.by, pair.asc ? 1 : -1]))
        : undefined,
      projection,
    });
    return iJobs.map((iJob) => new Job(iJob));
  }

  toClientVersion(): IJobFe {
    return {
      _id: this._id.toHexString(),
      name: this.name,
      isActive: this.isActive,
      projectId: this.projectId?.toHexString(),
    };
  }

  static async deleteMany() {
    await mongoDao.deleteMany<IJob>(Job.collectionName, {});
  }
  /* Mostly for internal use */

  fromInterface(iJob: IJob) {
    if (!iJob._id) {
      throw new Error("Interface object doesn't have an _id");
    }
    this._id = iJob._id;
    this.name = iJob.name;
    this.isActive = iJob.isActive;
    this.projectId = iJob.projectId;
    this.created = iJob.created;
    this.v = iJob.v;
  }

  async refresh() {
    const iJob = await mongoDao.findOne<IJob>(Job.collectionName, {
      _id: this._id,
    });
    if (iJob) {
      this.fromInterface(iJob);
    } else {
      throw new Error("Couldn't find document in DB");
    }
  }
}
