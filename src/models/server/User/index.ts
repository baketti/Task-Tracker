import { Filter, ObjectId, WithId } from "mongodb";
import mongoDao from "@/lib/mongodb/mongo-dao";
import * as crypto from "crypto";
import { UserRoles } from "@/models/common/UserCommon";
import { IUserFe } from "@/models/client/UserFe";

export type IUser = {
  _id?: ObjectId;
  email: string;
  hashedPassword: string;
  role: UserRoles;
  created: Date;
  v: number;
};

export class User implements WithId<IUser> {
  _id: ObjectId;
  email: string;
  hashedPassword: string;
  role: UserRoles;
  created: Date;
  v: number;

  static get collectionName() {
    return "users";
  }

  constructor(iUser: IUser) {
    this.fromInterface(iUser);
  }
  static hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
  }
  static async create(
    email: string,
    password: string,
    role: UserRoles,
  ): Promise<User | null> {
    await mongoDao.updateOne<IUser>(
      User.collectionName,
      { email },
      {
        $set: {
          created: new Date(),
          email,
          hashedPassword: User.hashPassword(password),
          role,
          v: 1,
        },
      },
      { upsert: true },
    );
    return User.getByEmail(email);
  }

  get isAdmin() {
    return this.role === UserRoles.Admin;
  }
  static async getById(_id: ObjectId): Promise<User | null> {
    const iUser = await mongoDao.findOne<IUser>(User.collectionName, {
      _id,
    });
    return iUser ? new User(iUser) : null;
  }
  static async getByEmail(email: string): Promise<User | null> {
    const iUser = await mongoDao.findOne<IUser>(User.collectionName, {
      email,
    });
    return iUser ? new User(iUser) : null;
  }
  async patch(fields: Partial<IUser>): Promise<void> {
    const result = await mongoDao.updateOne<IUser>(
      User.collectionName,
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
    const result = await mongoDao.deleteOne<IUser>(User.collectionName, {
      _id,
    });
    if (result.deletedCount !== 1) {
      throw new Error("Delete op was not applied successfully");
    }
  }

  static async getByCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const iUser = await mongoDao.findOne<IUser>(User.collectionName, {
      email,
      hashedPassword: User.hashPassword(password),
    });
    return iUser ? new User(iUser) : null;
  }

  static async deleteMany() {
    await mongoDao.deleteMany<IUser>(User.collectionName, {});
  }

  static async getList(
    filter: Filter<IUser> = {},
    {
      limit = 10,
      skip = 0,
      sort = [],
      projection = null,
    }: {
      limit?: number;
      skip?: number;
      sort?: {
        by: keyof IUser;
        asc: boolean;
      }[];
      projection?: Document;
    } = {
      limit: 10,
      skip: 0,
      sort: [],
      projection: null,
    },
  ): Promise<User[]> {
    const iUsers = await mongoDao.findMany<IUser>(User.collectionName, filter, {
      limit,
      skip,
      sort: sort.length
        ? Object.fromEntries(sort.map((pair) => [pair.by, pair.asc ? 1 : -1]))
        : undefined,
      projection,
    });
    return iUsers.map((iUser) => new User(iUser));
  }

  toClientVersion(): IUserFe {
    return {
      _id: this._id.toHexString(),
      email: this.email,
      role: this.role,
    };
  }
  /* Mostly for internal use */

  fromInterface(iUser: IUser) {
    if (!iUser._id) {
      throw new Error("Interface object doesn't have an _id");
    }
    this._id = iUser._id;
    this.email = iUser.email;
    this.hashedPassword = iUser.hashedPassword;
    this.role = iUser.role;
    this.created = iUser.created;
    this.v = iUser.v;
  }

  async refresh() {
    const iUser = await mongoDao.findOne<IUser>(User.collectionName, {
      _id: this._id,
    });
    if (iUser) {
      this.fromInterface(iUser);
    } else {
      throw new Error("Couldn't find document in DB");
    }
  }
}
