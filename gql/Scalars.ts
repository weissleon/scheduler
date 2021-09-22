import { GraphQLScalarType, Kind } from "graphql";
import { GraphQLError } from "graphql/error";
import { ObjectId } from "mongodb";

function serializeDate(value: any) {
  if (value instanceof Date) {
    return value.getTime();
  } else if (typeof value === "number") {
    return Math.trunc(value);
  } else if (typeof value === "string") {
    return Date.parse(value);
  }
  return null;
}

function parseDate(value: any) {
  if (value === null) {
    return null;
  }

  try {
    return new Date(value);
  } catch (err) {
    return null;
  }
}

function parseDateFromLiteral(ast: any) {
  if (ast.kind === Kind.INT) {
    const num = parseInt(ast.value, 10);
    return new Date(num);
  } else if (ast.kind === Kind.STRING) {
    return parseDate(ast.value);
  }
  return null;
}

export const TimestampScalar = new GraphQLScalarType({
  name: "Timestamp",
  description:
    "The javascript `Date` as integer. Type represents date and time " +
    "as number of milliseconds from start of UNIX epoch.",
  serialize: serializeDate,
  parseValue: parseDate,
  parseLiteral: parseDateFromLiteral,
});

function isValidMongoDBObjectID(id: string) {
  id = id + "";
  var len = id.length,
    valid = false;
  if (len === 12 || len === 24) {
    valid = /^[0-9a-fA-F]+$/.test(id);
  }
  return valid;
}

export const GraphQLObjectIdScalar = new GraphQLScalarType({
  name: "GraphQLObjectId",
  description:
    "GraphQLObjectId is a mongodb ObjectId. String of 12 or 24 hex chars",

  // from database towards client
  serialize(value) {
    /*if (value.constructor !== ObjectId) {
            throw new GraphQLError("serialize: value: " + value.toString() + " is not valid ObjectId");
        }*/

    let result = value.toString();
    if (!isValidMongoDBObjectID(result)) {
      throw new GraphQLError(
        "serialize: value: " + value.toString() + " is not valid ObjectId"
      );
    }

    return result;
  },

  // json from client towards database
  parseValue(value) {
    if (!isValidMongoDBObjectID(value)) {
      throw new GraphQLError(
        "serialize: not a valid ObjectId, require a string with 12 or 24 hex chars, found: " +
          value
      );
    }

    return new ObjectId(value);
  },

  // AST from client towards database
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        "parseLiteral: not a valid ObjectId, require a string with 12 or 24 hex chars, found: " +
          ast.kind,
        [ast]
      );
    }

    const value = ast.value.toString();
    return new ObjectId(value);
  },
});
