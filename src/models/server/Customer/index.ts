import { Filter, ObjectId, WithId } from "mongodb";
import mongoDao from "@/lib/mongodb/mongo-dao";
import { ICustomerFe } from "@/models/client/CustomerFe";

export type ICustomer = {
  _id?: ObjectId;
  name: string;
  logoUrl?: string;
  created: Date;
  v: number;
};

export class Customer implements WithId<ICustomer> {
  _id: ObjectId;
  name: string;
  logoUrl?: string;
  created: Date;
  v: number;

  static get collectionName() {
    return "customers";
  }

  constructor(iCustomer: ICustomer) {
    this.fromInterface(iCustomer);
  }

  static async create(
    name: string,
    logoUrl?: string,
  ): Promise<Customer | null> {
    const iCustomer = await mongoDao.insertOne<ICustomer>(
      Customer.collectionName,
      {
        name,
        logoUrl: logoUrl ?? null,
        created: new Date(),
        v: 1,
      },
    );
    return iCustomer ? new Customer(iCustomer) : null;
  }

  static async getById(_id: ObjectId): Promise<Customer | null> {
    const iCustomer = await mongoDao.findOne<ICustomer>(
      Customer.collectionName,
      {
        _id,
      },
    );
    return iCustomer ? new Customer(iCustomer) : null;
  }

  async patch(fields: Partial<ICustomer>): Promise<void> {
    const result = await mongoDao.updateOne<ICustomer>(
      Customer.collectionName,
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
    const result = await mongoDao.deleteOne<ICustomer>(
      Customer.collectionName,
      {
        _id,
      },
    );
    if (result.deletedCount !== 1) {
      throw new Error("Delete op was not applied successfully");
    }
  }

  static async deleteMany() {
    await mongoDao.deleteMany<ICustomer>(Customer.collectionName, {});
  }

  static async getList(
    filter: Filter<ICustomer> = {},
    {
      limit = 10,
      skip = 0,
      sort = [],
      projection = null,
    }: {
      limit?: number;
      skip?: number;
      sort?: {
        by: keyof ICustomer;
        asc: boolean;
      }[];
      projection?: Document;
    } = {
      limit: 10,
      skip: 0,
      sort: [],
      projection: null,
    },
  ): Promise<Customer[]> {
    const iCustomers = await mongoDao.findMany<ICustomer>(
      Customer.collectionName,
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
    return iCustomers.map((iCustomer) => new Customer(iCustomer));
  }

  toClientVersion(): ICustomerFe {
    //metodo per trasformare l'oggetto in un oggetto che può essere inviato al client
    return {
      _id: this._id.toHexString(),
      name: this.name,
      logoUrl: this.logoUrl,
    };
  }
  /* Mostly for internal use */

  fromInterface(iCustomer: ICustomer) {
    if (!iCustomer._id) {
      throw new Error("Interface object doesn't have an _id");
    }
    this._id = iCustomer._id;
    this.name = iCustomer.name;
    this.logoUrl = iCustomer.logoUrl;
    this.created = iCustomer.created;
    this.v = iCustomer.v;
  }

  async refresh() {
    const iCustomer = await mongoDao.findOne<ICustomer>(
      Customer.collectionName,
      {
        _id: this._id,
      },
    );
    if (iCustomer) {
      this.fromInterface(iCustomer);
    } else {
      throw new Error("Couldn't find document in DB");
    }
  }
}
