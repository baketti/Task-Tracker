import { Filter, ObjectId, WithId } from "mongodb";
import mongoDao from "@/lib/mongodb/mongo-dao";
import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
  ValidationResult,
} from "@/lib/response-handler";
import { User } from "@/models/server/User";
import { NextApiRequest, NextApiResponse } from "next";
import { i18n } from "@/translations/i18nextSetup";

export type IApisHelper = {
  _id?: ObjectId;
  created: Date;
  v: number;
};

export class ApisHelper implements WithId<IApisHelper> {
  _id: ObjectId;
  created: Date;
  v: number;

  static get collectionName() {
    return "apis-helpers";
  }

  constructor(iApisHelper: IApisHelper) {
    this.fromInterface(iApisHelper);
  }

  static async create(): Promise<ApisHelper | null> {
    const iApisHelper = await mongoDao.insertOne<IApisHelper>(
      ApisHelper.collectionName,
      {
        created: new Date(),
        v: 1,
      },
    );
    return iApisHelper ? new ApisHelper(iApisHelper) : null;
  }

  static async getById(_id: ObjectId): Promise<ApisHelper | null> {
    const iApisHelper = await mongoDao.findOne<IApisHelper>(
      ApisHelper.collectionName,
      {
        _id,
      },
    );
    return iApisHelper ? new ApisHelper(iApisHelper) : null;
  }

  async patch(fields: Partial<IApisHelper>): Promise<void> {
    const result = await mongoDao.updateOne<IApisHelper>(
      ApisHelper.collectionName,
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
    const result = await mongoDao.deleteOne<IApisHelper>(
      ApisHelper.collectionName,
      {
        _id,
      },
    );
    if (result.deletedCount !== 1) {
      throw new Error("Delete op was not applied successfully");
    }
  }

  static async getList(
    filter: Filter<IApisHelper> = {},
    {
      limit = 10,
      skip = 0,
      sort = [],
      projection = null,
    }: {
      limit?: number;
      skip?: number;
      sort?: {
        by: keyof IApisHelper;
        asc: boolean;
      }[];
      projection?: Document;
    } = {
      limit: 10,
      skip: 0,
      sort: [],
      projection: null,
    },
  ): Promise<ApisHelper[]> {
    const iApisHelpers = await mongoDao.findMany<IApisHelper>(
      ApisHelper.collectionName,
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
    return iApisHelpers.map((iApisHelper) => new ApisHelper(iApisHelper));
  }

  static async onlyAdmins(
    res: NextApiResponse,
    originalReq: NextApiRequest,
    validationResult: ValidationResult,
  ): Promise<{
    success: boolean;
    user?: User;
    response?: {
      payload?: ErrorResponse;
      statusCode: StatusCodes;
    };
  }> {
    if (!originalReq?.session?.user) {
      return {
        success: false,
        response: ResponseHandler.json<ErrorResponse>(
          res,
          {
            message: i18n.t("is.loggedout"),
          },
          StatusCodes.Unauthorized,
        ),
      };
    }

    if (!validationResult.isValid) {
      return {
        success: false,
        response: ResponseHandler.json<ErrorResponse>(
          res,
          { message: validationResult.message! },
          StatusCodes.BadRequest,
        ),
      };
    }

    const userId = new ObjectId(originalReq.session.user.userId);
    const user = await User.getById(userId);

    if (!user) {
      return {
        success: false,
        response: ResponseHandler.json<ErrorResponse>(
          res,
          {},
          StatusCodes.Unauthorized,
        ),
      };
    }
    //controllo se l'utente è un admin
    if (!user.isAdmin) {
      return {
        success: false,
        response: ResponseHandler.json<ErrorResponse>(
          res,
          {
            message: i18n.t("only.admin"),
          },
          StatusCodes.Forbidden,
        ),
      };
    }
    return {
      success: true,
      user,
    };
  }

  /* Mostly for internal use */

  fromInterface(iApisHelper: IApisHelper) {
    if (!iApisHelper._id) {
      throw new Error("Interface object doesn't have an _id");
    }
    this._id = iApisHelper._id;
    this.created = iApisHelper.created;
    this.v = iApisHelper.v;
  }

  async refresh() {
    const iApisHelper = await mongoDao.findOne<IApisHelper>(
      ApisHelper.collectionName,
      {
        _id: this._id,
      },
    );
    if (iApisHelper) {
      this.fromInterface(iApisHelper);
    } else {
      throw new Error("Couldn't find document in DB");
    }
  }
}
