import { Filter, ObjectId, WithId } from "mongodb";
import mongoDao from "@/lib/mongodb/mongo-dao";
import { IProjectFe } from "@/models/client/ProjectFe";
import { ICustomer } from "@/models/server/Customer";

export type IProject = {
  _id?: ObjectId;
  name: string;
  website?: string;
  customerId: ObjectId;
  intermediaryId?: ObjectId;
  created: Date;
  v: number;
};

export class Project implements WithId<IProject> {
  _id: ObjectId;
  name: string;
  website?: string;
  customerId: ObjectId;
  intermediaryId?: ObjectId;
  created: Date;
  v: number;

  static get collectionName() {
    return "projects";
  }

  constructor(iProject: IProject) {
    this.fromInterface(iProject);
  }

  static async create(
    name: string,
    customerId: ObjectId,
    website?: string,
    intermediaryId?: ObjectId,
  ): Promise<Project | null> {
    const iProject = await mongoDao.insertOne<IProject>(
      Project.collectionName,
      {
        name,
        customerId,
        website: website ?? null,
        intermediaryId: intermediaryId ?? null,
        created: new Date(),
        v: 1,
      },
    );
    return iProject ? new Project(iProject) : null;
  }

  static async getById(_id: ObjectId): Promise<Project | null> {
    const iProject = await mongoDao.findOne<IProject>(Project.collectionName, {
      _id,
    });
    return iProject ? new Project(iProject) : null;
  }

  async patch(fields: Partial<IProject>): Promise<void> {
    const result = await mongoDao.updateOne<IProject>(
      Project.collectionName,
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
    const result = await mongoDao.deleteOne<IProject>(Project.collectionName, {
      _id,
    });
    if (result.deletedCount !== 1) {
      throw new Error("Delete op was not applied successfully");
    }
  }

  static async getList(
    filter: Filter<IProject> = {},
    {
      limit = 10,
      skip = 0,
      sort = [],
      projection = null,
    }: {
      limit?: number;
      skip?: number;
      sort?: {
        by: keyof IProject;
        asc: boolean;
      }[];
      projection?: Document;
    } = {
      limit: 10,
      skip: 0,
      sort: [],
      projection: null,
    },
  ): Promise<Project[]> {
    const iProjects = await mongoDao.findMany<IProject>(
      Project.collectionName,
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
    return iProjects.map((iProject) => new Project(iProject));
  }

  toClientVersion(): IProjectFe {
    return {
      _id: this._id.toHexString(),
      name: this.name,
      website: this.website,
      customerId: this.customerId.toHexString(),
      intermediaryId: this.intermediaryId?.toHexString(),
    };
  }

  static async deleteMany() {
    await mongoDao.deleteMany<IProject>(Project.collectionName, {});
  }
  /* Mostly for internal use */

  fromInterface(iProject: IProject) {
    if (!iProject._id) {
      throw new Error("Interface object doesn't have an _id");
    }
    this._id = iProject._id;
    this.name = iProject.name;
    this.website = iProject.website;
    this.customerId = iProject.customerId;
    this.intermediaryId = iProject.intermediaryId;
    this.created = iProject.created;
    this.v = iProject.v;
  }

  async refresh() {
    const iProject = await mongoDao.findOne<IProject>(Project.collectionName, {
      _id: this._id,
    });
    if (iProject) {
      this.fromInterface(iProject);
    } else {
      throw new Error("Couldn't find document in DB");
    }
  }
}
