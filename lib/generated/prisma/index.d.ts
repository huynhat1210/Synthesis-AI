
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MasterProfile
 * 
 */
export type MasterProfile = $Result.DefaultSelection<Prisma.$MasterProfilePayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model SavedPitch
 * 
 */
export type SavedPitch = $Result.DefaultSelection<Prisma.$SavedPitchPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MasterProfiles
 * const masterProfiles = await prisma.masterProfile.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MasterProfiles
   * const masterProfiles = await prisma.masterProfile.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.masterProfile`: Exposes CRUD operations for the **MasterProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasterProfiles
    * const masterProfiles = await prisma.masterProfile.findMany()
    * ```
    */
  get masterProfile(): Prisma.MasterProfileDelegate<ExtArgs>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs>;

  /**
   * `prisma.savedPitch`: Exposes CRUD operations for the **SavedPitch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedPitches
    * const savedPitches = await prisma.savedPitch.findMany()
    * ```
    */
  get savedPitch(): Prisma.SavedPitchDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MasterProfile: 'MasterProfile',
    Project: 'Project',
    SavedPitch: 'SavedPitch'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "masterProfile" | "project" | "savedPitch"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MasterProfile: {
        payload: Prisma.$MasterProfilePayload<ExtArgs>
        fields: Prisma.MasterProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>
          }
          findFirst: {
            args: Prisma.MasterProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>
          }
          findMany: {
            args: Prisma.MasterProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>[]
          }
          create: {
            args: Prisma.MasterProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>
          }
          createMany: {
            args: Prisma.MasterProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>[]
          }
          delete: {
            args: Prisma.MasterProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>
          }
          update: {
            args: Prisma.MasterProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>
          }
          deleteMany: {
            args: Prisma.MasterProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MasterProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterProfilePayload>
          }
          aggregate: {
            args: Prisma.MasterProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMasterProfile>
          }
          groupBy: {
            args: Prisma.MasterProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterProfileCountArgs<ExtArgs>
            result: $Utils.Optional<MasterProfileCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      SavedPitch: {
        payload: Prisma.$SavedPitchPayload<ExtArgs>
        fields: Prisma.SavedPitchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedPitchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedPitchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>
          }
          findFirst: {
            args: Prisma.SavedPitchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedPitchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>
          }
          findMany: {
            args: Prisma.SavedPitchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>[]
          }
          create: {
            args: Prisma.SavedPitchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>
          }
          createMany: {
            args: Prisma.SavedPitchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedPitchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>[]
          }
          delete: {
            args: Prisma.SavedPitchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>
          }
          update: {
            args: Prisma.SavedPitchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>
          }
          deleteMany: {
            args: Prisma.SavedPitchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedPitchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SavedPitchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPitchPayload>
          }
          aggregate: {
            args: Prisma.SavedPitchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedPitch>
          }
          groupBy: {
            args: Prisma.SavedPitchGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedPitchGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedPitchCountArgs<ExtArgs>
            result: $Utils.Optional<SavedPitchCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MasterProfileCountOutputType
   */

  export type MasterProfileCountOutputType = {
    projects: number
    pitches: number
  }

  export type MasterProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | MasterProfileCountOutputTypeCountProjectsArgs
    pitches?: boolean | MasterProfileCountOutputTypeCountPitchesArgs
  }

  // Custom InputTypes
  /**
   * MasterProfileCountOutputType without action
   */
  export type MasterProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfileCountOutputType
     */
    select?: MasterProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MasterProfileCountOutputType without action
   */
  export type MasterProfileCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * MasterProfileCountOutputType without action
   */
  export type MasterProfileCountOutputTypeCountPitchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedPitchWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MasterProfile
   */

  export type AggregateMasterProfile = {
    _count: MasterProfileCountAggregateOutputType | null
    _min: MasterProfileMinAggregateOutputType | null
    _max: MasterProfileMaxAggregateOutputType | null
  }

  export type MasterProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    profileName: string | null
    isDefault: boolean | null
    fullName: string | null
    jobTitle: string | null
    bio: string | null
    plan: string | null
  }

  export type MasterProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    profileName: string | null
    isDefault: boolean | null
    fullName: string | null
    jobTitle: string | null
    bio: string | null
    plan: string | null
  }

  export type MasterProfileCountAggregateOutputType = {
    id: number
    userId: number
    profileName: number
    isDefault: number
    fullName: number
    jobTitle: number
    bio: number
    skills: number
    plan: number
    _all: number
  }


  export type MasterProfileMinAggregateInputType = {
    id?: true
    userId?: true
    profileName?: true
    isDefault?: true
    fullName?: true
    jobTitle?: true
    bio?: true
    plan?: true
  }

  export type MasterProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    profileName?: true
    isDefault?: true
    fullName?: true
    jobTitle?: true
    bio?: true
    plan?: true
  }

  export type MasterProfileCountAggregateInputType = {
    id?: true
    userId?: true
    profileName?: true
    isDefault?: true
    fullName?: true
    jobTitle?: true
    bio?: true
    skills?: true
    plan?: true
    _all?: true
  }

  export type MasterProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterProfile to aggregate.
     */
    where?: MasterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterProfiles to fetch.
     */
    orderBy?: MasterProfileOrderByWithRelationInput | MasterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasterProfiles
    **/
    _count?: true | MasterProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterProfileMaxAggregateInputType
  }

  export type GetMasterProfileAggregateType<T extends MasterProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateMasterProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasterProfile[P]>
      : GetScalarType<T[P], AggregateMasterProfile[P]>
  }




  export type MasterProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterProfileWhereInput
    orderBy?: MasterProfileOrderByWithAggregationInput | MasterProfileOrderByWithAggregationInput[]
    by: MasterProfileScalarFieldEnum[] | MasterProfileScalarFieldEnum
    having?: MasterProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterProfileCountAggregateInputType | true
    _min?: MasterProfileMinAggregateInputType
    _max?: MasterProfileMaxAggregateInputType
  }

  export type MasterProfileGroupByOutputType = {
    id: string
    userId: string
    profileName: string
    isDefault: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills: string[]
    plan: string
    _count: MasterProfileCountAggregateOutputType | null
    _min: MasterProfileMinAggregateOutputType | null
    _max: MasterProfileMaxAggregateOutputType | null
  }

  type GetMasterProfileGroupByPayload<T extends MasterProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterProfileGroupByOutputType[P]>
            : GetScalarType<T[P], MasterProfileGroupByOutputType[P]>
        }
      >
    >


  export type MasterProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    profileName?: boolean
    isDefault?: boolean
    fullName?: boolean
    jobTitle?: boolean
    bio?: boolean
    skills?: boolean
    plan?: boolean
    projects?: boolean | MasterProfile$projectsArgs<ExtArgs>
    pitches?: boolean | MasterProfile$pitchesArgs<ExtArgs>
    _count?: boolean | MasterProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["masterProfile"]>

  export type MasterProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    profileName?: boolean
    isDefault?: boolean
    fullName?: boolean
    jobTitle?: boolean
    bio?: boolean
    skills?: boolean
    plan?: boolean
  }, ExtArgs["result"]["masterProfile"]>

  export type MasterProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    profileName?: boolean
    isDefault?: boolean
    fullName?: boolean
    jobTitle?: boolean
    bio?: boolean
    skills?: boolean
    plan?: boolean
  }

  export type MasterProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | MasterProfile$projectsArgs<ExtArgs>
    pitches?: boolean | MasterProfile$pitchesArgs<ExtArgs>
    _count?: boolean | MasterProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MasterProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MasterProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasterProfile"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      pitches: Prisma.$SavedPitchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      profileName: string
      isDefault: boolean
      fullName: string
      jobTitle: string
      bio: string
      skills: string[]
      plan: string
    }, ExtArgs["result"]["masterProfile"]>
    composites: {}
  }

  type MasterProfileGetPayload<S extends boolean | null | undefined | MasterProfileDefaultArgs> = $Result.GetResult<Prisma.$MasterProfilePayload, S>

  type MasterProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MasterProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MasterProfileCountAggregateInputType | true
    }

  export interface MasterProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MasterProfile'], meta: { name: 'MasterProfile' } }
    /**
     * Find zero or one MasterProfile that matches the filter.
     * @param {MasterProfileFindUniqueArgs} args - Arguments to find a MasterProfile
     * @example
     * // Get one MasterProfile
     * const masterProfile = await prisma.masterProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterProfileFindUniqueArgs>(args: SelectSubset<T, MasterProfileFindUniqueArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MasterProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MasterProfileFindUniqueOrThrowArgs} args - Arguments to find a MasterProfile
     * @example
     * // Get one MasterProfile
     * const masterProfile = await prisma.masterProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MasterProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterProfileFindFirstArgs} args - Arguments to find a MasterProfile
     * @example
     * // Get one MasterProfile
     * const masterProfile = await prisma.masterProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterProfileFindFirstArgs>(args?: SelectSubset<T, MasterProfileFindFirstArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MasterProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterProfileFindFirstOrThrowArgs} args - Arguments to find a MasterProfile
     * @example
     * // Get one MasterProfile
     * const masterProfile = await prisma.masterProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MasterProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterProfiles
     * const masterProfiles = await prisma.masterProfile.findMany()
     * 
     * // Get first 10 MasterProfiles
     * const masterProfiles = await prisma.masterProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterProfileWithIdOnly = await prisma.masterProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterProfileFindManyArgs>(args?: SelectSubset<T, MasterProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MasterProfile.
     * @param {MasterProfileCreateArgs} args - Arguments to create a MasterProfile.
     * @example
     * // Create one MasterProfile
     * const MasterProfile = await prisma.masterProfile.create({
     *   data: {
     *     // ... data to create a MasterProfile
     *   }
     * })
     * 
     */
    create<T extends MasterProfileCreateArgs>(args: SelectSubset<T, MasterProfileCreateArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MasterProfiles.
     * @param {MasterProfileCreateManyArgs} args - Arguments to create many MasterProfiles.
     * @example
     * // Create many MasterProfiles
     * const masterProfile = await prisma.masterProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterProfileCreateManyArgs>(args?: SelectSubset<T, MasterProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MasterProfiles and returns the data saved in the database.
     * @param {MasterProfileCreateManyAndReturnArgs} args - Arguments to create many MasterProfiles.
     * @example
     * // Create many MasterProfiles
     * const masterProfile = await prisma.masterProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MasterProfiles and only return the `id`
     * const masterProfileWithIdOnly = await prisma.masterProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MasterProfile.
     * @param {MasterProfileDeleteArgs} args - Arguments to delete one MasterProfile.
     * @example
     * // Delete one MasterProfile
     * const MasterProfile = await prisma.masterProfile.delete({
     *   where: {
     *     // ... filter to delete one MasterProfile
     *   }
     * })
     * 
     */
    delete<T extends MasterProfileDeleteArgs>(args: SelectSubset<T, MasterProfileDeleteArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MasterProfile.
     * @param {MasterProfileUpdateArgs} args - Arguments to update one MasterProfile.
     * @example
     * // Update one MasterProfile
     * const masterProfile = await prisma.masterProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterProfileUpdateArgs>(args: SelectSubset<T, MasterProfileUpdateArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MasterProfiles.
     * @param {MasterProfileDeleteManyArgs} args - Arguments to filter MasterProfiles to delete.
     * @example
     * // Delete a few MasterProfiles
     * const { count } = await prisma.masterProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterProfileDeleteManyArgs>(args?: SelectSubset<T, MasterProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterProfiles
     * const masterProfile = await prisma.masterProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterProfileUpdateManyArgs>(args: SelectSubset<T, MasterProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MasterProfile.
     * @param {MasterProfileUpsertArgs} args - Arguments to update or create a MasterProfile.
     * @example
     * // Update or create a MasterProfile
     * const masterProfile = await prisma.masterProfile.upsert({
     *   create: {
     *     // ... data to create a MasterProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterProfile we want to update
     *   }
     * })
     */
    upsert<T extends MasterProfileUpsertArgs>(args: SelectSubset<T, MasterProfileUpsertArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MasterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterProfileCountArgs} args - Arguments to filter MasterProfiles to count.
     * @example
     * // Count the number of MasterProfiles
     * const count = await prisma.masterProfile.count({
     *   where: {
     *     // ... the filter for the MasterProfiles we want to count
     *   }
     * })
    **/
    count<T extends MasterProfileCountArgs>(
      args?: Subset<T, MasterProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MasterProfileAggregateArgs>(args: Subset<T, MasterProfileAggregateArgs>): Prisma.PrismaPromise<GetMasterProfileAggregateType<T>>

    /**
     * Group by MasterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MasterProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterProfileGroupByArgs['orderBy'] }
        : { orderBy?: MasterProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MasterProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MasterProfile model
   */
  readonly fields: MasterProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MasterProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends MasterProfile$projectsArgs<ExtArgs> = {}>(args?: Subset<T, MasterProfile$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany"> | Null>
    pitches<T extends MasterProfile$pitchesArgs<ExtArgs> = {}>(args?: Subset<T, MasterProfile$pitchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MasterProfile model
   */ 
  interface MasterProfileFieldRefs {
    readonly id: FieldRef<"MasterProfile", 'String'>
    readonly userId: FieldRef<"MasterProfile", 'String'>
    readonly profileName: FieldRef<"MasterProfile", 'String'>
    readonly isDefault: FieldRef<"MasterProfile", 'Boolean'>
    readonly fullName: FieldRef<"MasterProfile", 'String'>
    readonly jobTitle: FieldRef<"MasterProfile", 'String'>
    readonly bio: FieldRef<"MasterProfile", 'String'>
    readonly skills: FieldRef<"MasterProfile", 'String[]'>
    readonly plan: FieldRef<"MasterProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MasterProfile findUnique
   */
  export type MasterProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * Filter, which MasterProfile to fetch.
     */
    where: MasterProfileWhereUniqueInput
  }

  /**
   * MasterProfile findUniqueOrThrow
   */
  export type MasterProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * Filter, which MasterProfile to fetch.
     */
    where: MasterProfileWhereUniqueInput
  }

  /**
   * MasterProfile findFirst
   */
  export type MasterProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * Filter, which MasterProfile to fetch.
     */
    where?: MasterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterProfiles to fetch.
     */
    orderBy?: MasterProfileOrderByWithRelationInput | MasterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterProfiles.
     */
    cursor?: MasterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterProfiles.
     */
    distinct?: MasterProfileScalarFieldEnum | MasterProfileScalarFieldEnum[]
  }

  /**
   * MasterProfile findFirstOrThrow
   */
  export type MasterProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * Filter, which MasterProfile to fetch.
     */
    where?: MasterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterProfiles to fetch.
     */
    orderBy?: MasterProfileOrderByWithRelationInput | MasterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterProfiles.
     */
    cursor?: MasterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterProfiles.
     */
    distinct?: MasterProfileScalarFieldEnum | MasterProfileScalarFieldEnum[]
  }

  /**
   * MasterProfile findMany
   */
  export type MasterProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * Filter, which MasterProfiles to fetch.
     */
    where?: MasterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterProfiles to fetch.
     */
    orderBy?: MasterProfileOrderByWithRelationInput | MasterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasterProfiles.
     */
    cursor?: MasterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterProfiles.
     */
    skip?: number
    distinct?: MasterProfileScalarFieldEnum | MasterProfileScalarFieldEnum[]
  }

  /**
   * MasterProfile create
   */
  export type MasterProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a MasterProfile.
     */
    data: XOR<MasterProfileCreateInput, MasterProfileUncheckedCreateInput>
  }

  /**
   * MasterProfile createMany
   */
  export type MasterProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasterProfiles.
     */
    data: MasterProfileCreateManyInput | MasterProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterProfile createManyAndReturn
   */
  export type MasterProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MasterProfiles.
     */
    data: MasterProfileCreateManyInput | MasterProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterProfile update
   */
  export type MasterProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a MasterProfile.
     */
    data: XOR<MasterProfileUpdateInput, MasterProfileUncheckedUpdateInput>
    /**
     * Choose, which MasterProfile to update.
     */
    where: MasterProfileWhereUniqueInput
  }

  /**
   * MasterProfile updateMany
   */
  export type MasterProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MasterProfiles.
     */
    data: XOR<MasterProfileUpdateManyMutationInput, MasterProfileUncheckedUpdateManyInput>
    /**
     * Filter which MasterProfiles to update
     */
    where?: MasterProfileWhereInput
  }

  /**
   * MasterProfile upsert
   */
  export type MasterProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the MasterProfile to update in case it exists.
     */
    where: MasterProfileWhereUniqueInput
    /**
     * In case the MasterProfile found by the `where` argument doesn't exist, create a new MasterProfile with this data.
     */
    create: XOR<MasterProfileCreateInput, MasterProfileUncheckedCreateInput>
    /**
     * In case the MasterProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterProfileUpdateInput, MasterProfileUncheckedUpdateInput>
  }

  /**
   * MasterProfile delete
   */
  export type MasterProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
    /**
     * Filter which MasterProfile to delete.
     */
    where: MasterProfileWhereUniqueInput
  }

  /**
   * MasterProfile deleteMany
   */
  export type MasterProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterProfiles to delete
     */
    where?: MasterProfileWhereInput
  }

  /**
   * MasterProfile.projects
   */
  export type MasterProfile$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * MasterProfile.pitches
   */
  export type MasterProfile$pitchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    where?: SavedPitchWhereInput
    orderBy?: SavedPitchOrderByWithRelationInput | SavedPitchOrderByWithRelationInput[]
    cursor?: SavedPitchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedPitchScalarFieldEnum | SavedPitchScalarFieldEnum[]
  }

  /**
   * MasterProfile without action
   */
  export type MasterProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterProfile
     */
    select?: MasterProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterProfileInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    year: number | null
  }

  export type ProjectSumAggregateOutputType = {
    year: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    image: string | null
    outcome: string | null
    year: number | null
    profileId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    image: string | null
    outcome: string | null
    year: number | null
    profileId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    description: number
    image: number
    outcome: number
    year: number
    profileId: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    year?: true
  }

  export type ProjectSumAggregateInputType = {
    year?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    outcome?: true
    year?: true
    profileId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    outcome?: true
    year?: true
    profileId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    outcome?: true
    year?: true
    profileId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    description: string
    image: string | null
    outcome: string | null
    year: number | null
    profileId: string
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    outcome?: boolean
    year?: boolean
    profileId?: boolean
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    outcome?: boolean
    year?: boolean
    profileId?: boolean
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    outcome?: boolean
    year?: boolean
    profileId?: boolean
  }

  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      profile: Prisma.$MasterProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      image: string | null
      outcome: string | null
      year: number | null
      profileId: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends MasterProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MasterProfileDefaultArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */ 
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly image: FieldRef<"Project", 'String'>
    readonly outcome: FieldRef<"Project", 'String'>
    readonly year: FieldRef<"Project", 'Int'>
    readonly profileId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model SavedPitch
   */

  export type AggregateSavedPitch = {
    _count: SavedPitchCountAggregateOutputType | null
    _min: SavedPitchMinAggregateOutputType | null
    _max: SavedPitchMaxAggregateOutputType | null
  }

  export type SavedPitchMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    date: string | null
    starred: boolean | null
    note: string | null
    profileId: string | null
  }

  export type SavedPitchMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    date: string | null
    starred: boolean | null
    note: string | null
    profileId: string | null
  }

  export type SavedPitchCountAggregateOutputType = {
    id: number
    createdAt: number
    date: number
    starred: number
    note: number
    context: number
    pitch: number
    profileSnap: number
    profileId: number
    _all: number
  }


  export type SavedPitchMinAggregateInputType = {
    id?: true
    createdAt?: true
    date?: true
    starred?: true
    note?: true
    profileId?: true
  }

  export type SavedPitchMaxAggregateInputType = {
    id?: true
    createdAt?: true
    date?: true
    starred?: true
    note?: true
    profileId?: true
  }

  export type SavedPitchCountAggregateInputType = {
    id?: true
    createdAt?: true
    date?: true
    starred?: true
    note?: true
    context?: true
    pitch?: true
    profileSnap?: true
    profileId?: true
    _all?: true
  }

  export type SavedPitchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedPitch to aggregate.
     */
    where?: SavedPitchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPitches to fetch.
     */
    orderBy?: SavedPitchOrderByWithRelationInput | SavedPitchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedPitchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPitches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPitches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedPitches
    **/
    _count?: true | SavedPitchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedPitchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedPitchMaxAggregateInputType
  }

  export type GetSavedPitchAggregateType<T extends SavedPitchAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedPitch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedPitch[P]>
      : GetScalarType<T[P], AggregateSavedPitch[P]>
  }




  export type SavedPitchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedPitchWhereInput
    orderBy?: SavedPitchOrderByWithAggregationInput | SavedPitchOrderByWithAggregationInput[]
    by: SavedPitchScalarFieldEnum[] | SavedPitchScalarFieldEnum
    having?: SavedPitchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedPitchCountAggregateInputType | true
    _min?: SavedPitchMinAggregateInputType
    _max?: SavedPitchMaxAggregateInputType
  }

  export type SavedPitchGroupByOutputType = {
    id: string
    createdAt: Date
    date: string
    starred: boolean
    note: string | null
    context: JsonValue
    pitch: JsonValue
    profileSnap: JsonValue
    profileId: string
    _count: SavedPitchCountAggregateOutputType | null
    _min: SavedPitchMinAggregateOutputType | null
    _max: SavedPitchMaxAggregateOutputType | null
  }

  type GetSavedPitchGroupByPayload<T extends SavedPitchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedPitchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedPitchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedPitchGroupByOutputType[P]>
            : GetScalarType<T[P], SavedPitchGroupByOutputType[P]>
        }
      >
    >


  export type SavedPitchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    date?: boolean
    starred?: boolean
    note?: boolean
    context?: boolean
    pitch?: boolean
    profileSnap?: boolean
    profileId?: boolean
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedPitch"]>

  export type SavedPitchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    date?: boolean
    starred?: boolean
    note?: boolean
    context?: boolean
    pitch?: boolean
    profileSnap?: boolean
    profileId?: boolean
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedPitch"]>

  export type SavedPitchSelectScalar = {
    id?: boolean
    createdAt?: boolean
    date?: boolean
    starred?: boolean
    note?: boolean
    context?: boolean
    pitch?: boolean
    profileSnap?: boolean
    profileId?: boolean
  }

  export type SavedPitchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }
  export type SavedPitchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | MasterProfileDefaultArgs<ExtArgs>
  }

  export type $SavedPitchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedPitch"
    objects: {
      profile: Prisma.$MasterProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      date: string
      starred: boolean
      note: string | null
      context: Prisma.JsonValue
      pitch: Prisma.JsonValue
      profileSnap: Prisma.JsonValue
      profileId: string
    }, ExtArgs["result"]["savedPitch"]>
    composites: {}
  }

  type SavedPitchGetPayload<S extends boolean | null | undefined | SavedPitchDefaultArgs> = $Result.GetResult<Prisma.$SavedPitchPayload, S>

  type SavedPitchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SavedPitchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SavedPitchCountAggregateInputType | true
    }

  export interface SavedPitchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedPitch'], meta: { name: 'SavedPitch' } }
    /**
     * Find zero or one SavedPitch that matches the filter.
     * @param {SavedPitchFindUniqueArgs} args - Arguments to find a SavedPitch
     * @example
     * // Get one SavedPitch
     * const savedPitch = await prisma.savedPitch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedPitchFindUniqueArgs>(args: SelectSubset<T, SavedPitchFindUniqueArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SavedPitch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SavedPitchFindUniqueOrThrowArgs} args - Arguments to find a SavedPitch
     * @example
     * // Get one SavedPitch
     * const savedPitch = await prisma.savedPitch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedPitchFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedPitchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SavedPitch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPitchFindFirstArgs} args - Arguments to find a SavedPitch
     * @example
     * // Get one SavedPitch
     * const savedPitch = await prisma.savedPitch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedPitchFindFirstArgs>(args?: SelectSubset<T, SavedPitchFindFirstArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SavedPitch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPitchFindFirstOrThrowArgs} args - Arguments to find a SavedPitch
     * @example
     * // Get one SavedPitch
     * const savedPitch = await prisma.savedPitch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedPitchFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedPitchFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SavedPitches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPitchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedPitches
     * const savedPitches = await prisma.savedPitch.findMany()
     * 
     * // Get first 10 SavedPitches
     * const savedPitches = await prisma.savedPitch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedPitchWithIdOnly = await prisma.savedPitch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedPitchFindManyArgs>(args?: SelectSubset<T, SavedPitchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SavedPitch.
     * @param {SavedPitchCreateArgs} args - Arguments to create a SavedPitch.
     * @example
     * // Create one SavedPitch
     * const SavedPitch = await prisma.savedPitch.create({
     *   data: {
     *     // ... data to create a SavedPitch
     *   }
     * })
     * 
     */
    create<T extends SavedPitchCreateArgs>(args: SelectSubset<T, SavedPitchCreateArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SavedPitches.
     * @param {SavedPitchCreateManyArgs} args - Arguments to create many SavedPitches.
     * @example
     * // Create many SavedPitches
     * const savedPitch = await prisma.savedPitch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedPitchCreateManyArgs>(args?: SelectSubset<T, SavedPitchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedPitches and returns the data saved in the database.
     * @param {SavedPitchCreateManyAndReturnArgs} args - Arguments to create many SavedPitches.
     * @example
     * // Create many SavedPitches
     * const savedPitch = await prisma.savedPitch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedPitches and only return the `id`
     * const savedPitchWithIdOnly = await prisma.savedPitch.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedPitchCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedPitchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SavedPitch.
     * @param {SavedPitchDeleteArgs} args - Arguments to delete one SavedPitch.
     * @example
     * // Delete one SavedPitch
     * const SavedPitch = await prisma.savedPitch.delete({
     *   where: {
     *     // ... filter to delete one SavedPitch
     *   }
     * })
     * 
     */
    delete<T extends SavedPitchDeleteArgs>(args: SelectSubset<T, SavedPitchDeleteArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SavedPitch.
     * @param {SavedPitchUpdateArgs} args - Arguments to update one SavedPitch.
     * @example
     * // Update one SavedPitch
     * const savedPitch = await prisma.savedPitch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedPitchUpdateArgs>(args: SelectSubset<T, SavedPitchUpdateArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SavedPitches.
     * @param {SavedPitchDeleteManyArgs} args - Arguments to filter SavedPitches to delete.
     * @example
     * // Delete a few SavedPitches
     * const { count } = await prisma.savedPitch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedPitchDeleteManyArgs>(args?: SelectSubset<T, SavedPitchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedPitches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPitchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedPitches
     * const savedPitch = await prisma.savedPitch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedPitchUpdateManyArgs>(args: SelectSubset<T, SavedPitchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SavedPitch.
     * @param {SavedPitchUpsertArgs} args - Arguments to update or create a SavedPitch.
     * @example
     * // Update or create a SavedPitch
     * const savedPitch = await prisma.savedPitch.upsert({
     *   create: {
     *     // ... data to create a SavedPitch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedPitch we want to update
     *   }
     * })
     */
    upsert<T extends SavedPitchUpsertArgs>(args: SelectSubset<T, SavedPitchUpsertArgs<ExtArgs>>): Prisma__SavedPitchClient<$Result.GetResult<Prisma.$SavedPitchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SavedPitches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPitchCountArgs} args - Arguments to filter SavedPitches to count.
     * @example
     * // Count the number of SavedPitches
     * const count = await prisma.savedPitch.count({
     *   where: {
     *     // ... the filter for the SavedPitches we want to count
     *   }
     * })
    **/
    count<T extends SavedPitchCountArgs>(
      args?: Subset<T, SavedPitchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedPitchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedPitch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPitchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedPitchAggregateArgs>(args: Subset<T, SavedPitchAggregateArgs>): Prisma.PrismaPromise<GetSavedPitchAggregateType<T>>

    /**
     * Group by SavedPitch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPitchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedPitchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedPitchGroupByArgs['orderBy'] }
        : { orderBy?: SavedPitchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedPitchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedPitchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedPitch model
   */
  readonly fields: SavedPitchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedPitch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedPitchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends MasterProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MasterProfileDefaultArgs<ExtArgs>>): Prisma__MasterProfileClient<$Result.GetResult<Prisma.$MasterProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedPitch model
   */ 
  interface SavedPitchFieldRefs {
    readonly id: FieldRef<"SavedPitch", 'String'>
    readonly createdAt: FieldRef<"SavedPitch", 'DateTime'>
    readonly date: FieldRef<"SavedPitch", 'String'>
    readonly starred: FieldRef<"SavedPitch", 'Boolean'>
    readonly note: FieldRef<"SavedPitch", 'String'>
    readonly context: FieldRef<"SavedPitch", 'Json'>
    readonly pitch: FieldRef<"SavedPitch", 'Json'>
    readonly profileSnap: FieldRef<"SavedPitch", 'Json'>
    readonly profileId: FieldRef<"SavedPitch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SavedPitch findUnique
   */
  export type SavedPitchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * Filter, which SavedPitch to fetch.
     */
    where: SavedPitchWhereUniqueInput
  }

  /**
   * SavedPitch findUniqueOrThrow
   */
  export type SavedPitchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * Filter, which SavedPitch to fetch.
     */
    where: SavedPitchWhereUniqueInput
  }

  /**
   * SavedPitch findFirst
   */
  export type SavedPitchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * Filter, which SavedPitch to fetch.
     */
    where?: SavedPitchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPitches to fetch.
     */
    orderBy?: SavedPitchOrderByWithRelationInput | SavedPitchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedPitches.
     */
    cursor?: SavedPitchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPitches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPitches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedPitches.
     */
    distinct?: SavedPitchScalarFieldEnum | SavedPitchScalarFieldEnum[]
  }

  /**
   * SavedPitch findFirstOrThrow
   */
  export type SavedPitchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * Filter, which SavedPitch to fetch.
     */
    where?: SavedPitchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPitches to fetch.
     */
    orderBy?: SavedPitchOrderByWithRelationInput | SavedPitchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedPitches.
     */
    cursor?: SavedPitchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPitches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPitches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedPitches.
     */
    distinct?: SavedPitchScalarFieldEnum | SavedPitchScalarFieldEnum[]
  }

  /**
   * SavedPitch findMany
   */
  export type SavedPitchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * Filter, which SavedPitches to fetch.
     */
    where?: SavedPitchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPitches to fetch.
     */
    orderBy?: SavedPitchOrderByWithRelationInput | SavedPitchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedPitches.
     */
    cursor?: SavedPitchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPitches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPitches.
     */
    skip?: number
    distinct?: SavedPitchScalarFieldEnum | SavedPitchScalarFieldEnum[]
  }

  /**
   * SavedPitch create
   */
  export type SavedPitchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedPitch.
     */
    data: XOR<SavedPitchCreateInput, SavedPitchUncheckedCreateInput>
  }

  /**
   * SavedPitch createMany
   */
  export type SavedPitchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedPitches.
     */
    data: SavedPitchCreateManyInput | SavedPitchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedPitch createManyAndReturn
   */
  export type SavedPitchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SavedPitches.
     */
    data: SavedPitchCreateManyInput | SavedPitchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedPitch update
   */
  export type SavedPitchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedPitch.
     */
    data: XOR<SavedPitchUpdateInput, SavedPitchUncheckedUpdateInput>
    /**
     * Choose, which SavedPitch to update.
     */
    where: SavedPitchWhereUniqueInput
  }

  /**
   * SavedPitch updateMany
   */
  export type SavedPitchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedPitches.
     */
    data: XOR<SavedPitchUpdateManyMutationInput, SavedPitchUncheckedUpdateManyInput>
    /**
     * Filter which SavedPitches to update
     */
    where?: SavedPitchWhereInput
  }

  /**
   * SavedPitch upsert
   */
  export type SavedPitchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedPitch to update in case it exists.
     */
    where: SavedPitchWhereUniqueInput
    /**
     * In case the SavedPitch found by the `where` argument doesn't exist, create a new SavedPitch with this data.
     */
    create: XOR<SavedPitchCreateInput, SavedPitchUncheckedCreateInput>
    /**
     * In case the SavedPitch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedPitchUpdateInput, SavedPitchUncheckedUpdateInput>
  }

  /**
   * SavedPitch delete
   */
  export type SavedPitchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
    /**
     * Filter which SavedPitch to delete.
     */
    where: SavedPitchWhereUniqueInput
  }

  /**
   * SavedPitch deleteMany
   */
  export type SavedPitchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedPitches to delete
     */
    where?: SavedPitchWhereInput
  }

  /**
   * SavedPitch without action
   */
  export type SavedPitchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPitch
     */
    select?: SavedPitchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPitchInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MasterProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    profileName: 'profileName',
    isDefault: 'isDefault',
    fullName: 'fullName',
    jobTitle: 'jobTitle',
    bio: 'bio',
    skills: 'skills',
    plan: 'plan'
  };

  export type MasterProfileScalarFieldEnum = (typeof MasterProfileScalarFieldEnum)[keyof typeof MasterProfileScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    image: 'image',
    outcome: 'outcome',
    year: 'year',
    profileId: 'profileId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SavedPitchScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    date: 'date',
    starred: 'starred',
    note: 'note',
    context: 'context',
    pitch: 'pitch',
    profileSnap: 'profileSnap',
    profileId: 'profileId'
  };

  export type SavedPitchScalarFieldEnum = (typeof SavedPitchScalarFieldEnum)[keyof typeof SavedPitchScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MasterProfileWhereInput = {
    AND?: MasterProfileWhereInput | MasterProfileWhereInput[]
    OR?: MasterProfileWhereInput[]
    NOT?: MasterProfileWhereInput | MasterProfileWhereInput[]
    id?: StringFilter<"MasterProfile"> | string
    userId?: StringFilter<"MasterProfile"> | string
    profileName?: StringFilter<"MasterProfile"> | string
    isDefault?: BoolFilter<"MasterProfile"> | boolean
    fullName?: StringFilter<"MasterProfile"> | string
    jobTitle?: StringFilter<"MasterProfile"> | string
    bio?: StringFilter<"MasterProfile"> | string
    skills?: StringNullableListFilter<"MasterProfile">
    plan?: StringFilter<"MasterProfile"> | string
    projects?: ProjectListRelationFilter
    pitches?: SavedPitchListRelationFilter
  }

  export type MasterProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    profileName?: SortOrder
    isDefault?: SortOrder
    fullName?: SortOrder
    jobTitle?: SortOrder
    bio?: SortOrder
    skills?: SortOrder
    plan?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
    pitches?: SavedPitchOrderByRelationAggregateInput
  }

  export type MasterProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MasterProfileWhereInput | MasterProfileWhereInput[]
    OR?: MasterProfileWhereInput[]
    NOT?: MasterProfileWhereInput | MasterProfileWhereInput[]
    userId?: StringFilter<"MasterProfile"> | string
    profileName?: StringFilter<"MasterProfile"> | string
    isDefault?: BoolFilter<"MasterProfile"> | boolean
    fullName?: StringFilter<"MasterProfile"> | string
    jobTitle?: StringFilter<"MasterProfile"> | string
    bio?: StringFilter<"MasterProfile"> | string
    skills?: StringNullableListFilter<"MasterProfile">
    plan?: StringFilter<"MasterProfile"> | string
    projects?: ProjectListRelationFilter
    pitches?: SavedPitchListRelationFilter
  }, "id">

  export type MasterProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    profileName?: SortOrder
    isDefault?: SortOrder
    fullName?: SortOrder
    jobTitle?: SortOrder
    bio?: SortOrder
    skills?: SortOrder
    plan?: SortOrder
    _count?: MasterProfileCountOrderByAggregateInput
    _max?: MasterProfileMaxOrderByAggregateInput
    _min?: MasterProfileMinOrderByAggregateInput
  }

  export type MasterProfileScalarWhereWithAggregatesInput = {
    AND?: MasterProfileScalarWhereWithAggregatesInput | MasterProfileScalarWhereWithAggregatesInput[]
    OR?: MasterProfileScalarWhereWithAggregatesInput[]
    NOT?: MasterProfileScalarWhereWithAggregatesInput | MasterProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasterProfile"> | string
    userId?: StringWithAggregatesFilter<"MasterProfile"> | string
    profileName?: StringWithAggregatesFilter<"MasterProfile"> | string
    isDefault?: BoolWithAggregatesFilter<"MasterProfile"> | boolean
    fullName?: StringWithAggregatesFilter<"MasterProfile"> | string
    jobTitle?: StringWithAggregatesFilter<"MasterProfile"> | string
    bio?: StringWithAggregatesFilter<"MasterProfile"> | string
    skills?: StringNullableListFilter<"MasterProfile">
    plan?: StringWithAggregatesFilter<"MasterProfile"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    image?: StringNullableFilter<"Project"> | string | null
    outcome?: StringNullableFilter<"Project"> | string | null
    year?: IntNullableFilter<"Project"> | number | null
    profileId?: StringFilter<"Project"> | string
    profile?: XOR<MasterProfileRelationFilter, MasterProfileWhereInput>
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    profileId?: SortOrder
    profile?: MasterProfileOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    image?: StringNullableFilter<"Project"> | string | null
    outcome?: StringNullableFilter<"Project"> | string | null
    year?: IntNullableFilter<"Project"> | number | null
    profileId?: StringFilter<"Project"> | string
    profile?: XOR<MasterProfileRelationFilter, MasterProfileWhereInput>
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    profileId?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    image?: StringNullableWithAggregatesFilter<"Project"> | string | null
    outcome?: StringNullableWithAggregatesFilter<"Project"> | string | null
    year?: IntNullableWithAggregatesFilter<"Project"> | number | null
    profileId?: StringWithAggregatesFilter<"Project"> | string
  }

  export type SavedPitchWhereInput = {
    AND?: SavedPitchWhereInput | SavedPitchWhereInput[]
    OR?: SavedPitchWhereInput[]
    NOT?: SavedPitchWhereInput | SavedPitchWhereInput[]
    id?: StringFilter<"SavedPitch"> | string
    createdAt?: DateTimeFilter<"SavedPitch"> | Date | string
    date?: StringFilter<"SavedPitch"> | string
    starred?: BoolFilter<"SavedPitch"> | boolean
    note?: StringNullableFilter<"SavedPitch"> | string | null
    context?: JsonFilter<"SavedPitch">
    pitch?: JsonFilter<"SavedPitch">
    profileSnap?: JsonFilter<"SavedPitch">
    profileId?: StringFilter<"SavedPitch"> | string
    profile?: XOR<MasterProfileRelationFilter, MasterProfileWhereInput>
  }

  export type SavedPitchOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    date?: SortOrder
    starred?: SortOrder
    note?: SortOrderInput | SortOrder
    context?: SortOrder
    pitch?: SortOrder
    profileSnap?: SortOrder
    profileId?: SortOrder
    profile?: MasterProfileOrderByWithRelationInput
  }

  export type SavedPitchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SavedPitchWhereInput | SavedPitchWhereInput[]
    OR?: SavedPitchWhereInput[]
    NOT?: SavedPitchWhereInput | SavedPitchWhereInput[]
    createdAt?: DateTimeFilter<"SavedPitch"> | Date | string
    date?: StringFilter<"SavedPitch"> | string
    starred?: BoolFilter<"SavedPitch"> | boolean
    note?: StringNullableFilter<"SavedPitch"> | string | null
    context?: JsonFilter<"SavedPitch">
    pitch?: JsonFilter<"SavedPitch">
    profileSnap?: JsonFilter<"SavedPitch">
    profileId?: StringFilter<"SavedPitch"> | string
    profile?: XOR<MasterProfileRelationFilter, MasterProfileWhereInput>
  }, "id">

  export type SavedPitchOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    date?: SortOrder
    starred?: SortOrder
    note?: SortOrderInput | SortOrder
    context?: SortOrder
    pitch?: SortOrder
    profileSnap?: SortOrder
    profileId?: SortOrder
    _count?: SavedPitchCountOrderByAggregateInput
    _max?: SavedPitchMaxOrderByAggregateInput
    _min?: SavedPitchMinOrderByAggregateInput
  }

  export type SavedPitchScalarWhereWithAggregatesInput = {
    AND?: SavedPitchScalarWhereWithAggregatesInput | SavedPitchScalarWhereWithAggregatesInput[]
    OR?: SavedPitchScalarWhereWithAggregatesInput[]
    NOT?: SavedPitchScalarWhereWithAggregatesInput | SavedPitchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SavedPitch"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SavedPitch"> | Date | string
    date?: StringWithAggregatesFilter<"SavedPitch"> | string
    starred?: BoolWithAggregatesFilter<"SavedPitch"> | boolean
    note?: StringNullableWithAggregatesFilter<"SavedPitch"> | string | null
    context?: JsonWithAggregatesFilter<"SavedPitch">
    pitch?: JsonWithAggregatesFilter<"SavedPitch">
    profileSnap?: JsonWithAggregatesFilter<"SavedPitch">
    profileId?: StringWithAggregatesFilter<"SavedPitch"> | string
  }

  export type MasterProfileCreateInput = {
    id?: string
    userId: string
    profileName?: string
    isDefault?: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills?: MasterProfileCreateskillsInput | string[]
    plan?: string
    projects?: ProjectCreateNestedManyWithoutProfileInput
    pitches?: SavedPitchCreateNestedManyWithoutProfileInput
  }

  export type MasterProfileUncheckedCreateInput = {
    id?: string
    userId: string
    profileName?: string
    isDefault?: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills?: MasterProfileCreateskillsInput | string[]
    plan?: string
    projects?: ProjectUncheckedCreateNestedManyWithoutProfileInput
    pitches?: SavedPitchUncheckedCreateNestedManyWithoutProfileInput
  }

  export type MasterProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
    projects?: ProjectUpdateManyWithoutProfileNestedInput
    pitches?: SavedPitchUpdateManyWithoutProfileNestedInput
  }

  export type MasterProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
    projects?: ProjectUncheckedUpdateManyWithoutProfileNestedInput
    pitches?: SavedPitchUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type MasterProfileCreateManyInput = {
    id?: string
    userId: string
    profileName?: string
    isDefault?: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills?: MasterProfileCreateskillsInput | string[]
    plan?: string
  }

  export type MasterProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
  }

  export type MasterProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    description: string
    image?: string | null
    outcome?: string | null
    year?: number | null
    profile?: MasterProfileCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    image?: string | null
    outcome?: string | null
    year?: number | null
    profileId?: string
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    profile?: MasterProfileUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    profileId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    description: string
    image?: string | null
    outcome?: string | null
    year?: number | null
    profileId?: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    profileId?: StringFieldUpdateOperationsInput | string
  }

  export type SavedPitchCreateInput = {
    id: string
    createdAt?: Date | string
    date: string
    starred?: boolean
    note?: string | null
    context: JsonNullValueInput | InputJsonValue
    pitch: JsonNullValueInput | InputJsonValue
    profileSnap: JsonNullValueInput | InputJsonValue
    profile?: MasterProfileCreateNestedOneWithoutPitchesInput
  }

  export type SavedPitchUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    date: string
    starred?: boolean
    note?: string | null
    context: JsonNullValueInput | InputJsonValue
    pitch: JsonNullValueInput | InputJsonValue
    profileSnap: JsonNullValueInput | InputJsonValue
    profileId?: string
  }

  export type SavedPitchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    context?: JsonNullValueInput | InputJsonValue
    pitch?: JsonNullValueInput | InputJsonValue
    profileSnap?: JsonNullValueInput | InputJsonValue
    profile?: MasterProfileUpdateOneRequiredWithoutPitchesNestedInput
  }

  export type SavedPitchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    context?: JsonNullValueInput | InputJsonValue
    pitch?: JsonNullValueInput | InputJsonValue
    profileSnap?: JsonNullValueInput | InputJsonValue
    profileId?: StringFieldUpdateOperationsInput | string
  }

  export type SavedPitchCreateManyInput = {
    id: string
    createdAt?: Date | string
    date: string
    starred?: boolean
    note?: string | null
    context: JsonNullValueInput | InputJsonValue
    pitch: JsonNullValueInput | InputJsonValue
    profileSnap: JsonNullValueInput | InputJsonValue
    profileId?: string
  }

  export type SavedPitchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    context?: JsonNullValueInput | InputJsonValue
    pitch?: JsonNullValueInput | InputJsonValue
    profileSnap?: JsonNullValueInput | InputJsonValue
  }

  export type SavedPitchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    context?: JsonNullValueInput | InputJsonValue
    pitch?: JsonNullValueInput | InputJsonValue
    profileSnap?: JsonNullValueInput | InputJsonValue
    profileId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SavedPitchListRelationFilter = {
    every?: SavedPitchWhereInput
    some?: SavedPitchWhereInput
    none?: SavedPitchWhereInput
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedPitchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MasterProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileName?: SortOrder
    isDefault?: SortOrder
    fullName?: SortOrder
    jobTitle?: SortOrder
    bio?: SortOrder
    skills?: SortOrder
    plan?: SortOrder
  }

  export type MasterProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileName?: SortOrder
    isDefault?: SortOrder
    fullName?: SortOrder
    jobTitle?: SortOrder
    bio?: SortOrder
    plan?: SortOrder
  }

  export type MasterProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileName?: SortOrder
    isDefault?: SortOrder
    fullName?: SortOrder
    jobTitle?: SortOrder
    bio?: SortOrder
    plan?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MasterProfileRelationFilter = {
    is?: MasterProfileWhereInput
    isNot?: MasterProfileWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    outcome?: SortOrder
    year?: SortOrder
    profileId?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    outcome?: SortOrder
    year?: SortOrder
    profileId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    outcome?: SortOrder
    year?: SortOrder
    profileId?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SavedPitchCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    date?: SortOrder
    starred?: SortOrder
    note?: SortOrder
    context?: SortOrder
    pitch?: SortOrder
    profileSnap?: SortOrder
    profileId?: SortOrder
  }

  export type SavedPitchMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    date?: SortOrder
    starred?: SortOrder
    note?: SortOrder
    profileId?: SortOrder
  }

  export type SavedPitchMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    date?: SortOrder
    starred?: SortOrder
    note?: SortOrder
    profileId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type MasterProfileCreateskillsInput = {
    set: string[]
  }

  export type ProjectCreateNestedManyWithoutProfileInput = {
    create?: XOR<ProjectCreateWithoutProfileInput, ProjectUncheckedCreateWithoutProfileInput> | ProjectCreateWithoutProfileInput[] | ProjectUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProfileInput | ProjectCreateOrConnectWithoutProfileInput[]
    createMany?: ProjectCreateManyProfileInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SavedPitchCreateNestedManyWithoutProfileInput = {
    create?: XOR<SavedPitchCreateWithoutProfileInput, SavedPitchUncheckedCreateWithoutProfileInput> | SavedPitchCreateWithoutProfileInput[] | SavedPitchUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SavedPitchCreateOrConnectWithoutProfileInput | SavedPitchCreateOrConnectWithoutProfileInput[]
    createMany?: SavedPitchCreateManyProfileInputEnvelope
    connect?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ProjectCreateWithoutProfileInput, ProjectUncheckedCreateWithoutProfileInput> | ProjectCreateWithoutProfileInput[] | ProjectUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProfileInput | ProjectCreateOrConnectWithoutProfileInput[]
    createMany?: ProjectCreateManyProfileInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SavedPitchUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<SavedPitchCreateWithoutProfileInput, SavedPitchUncheckedCreateWithoutProfileInput> | SavedPitchCreateWithoutProfileInput[] | SavedPitchUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SavedPitchCreateOrConnectWithoutProfileInput | SavedPitchCreateOrConnectWithoutProfileInput[]
    createMany?: SavedPitchCreateManyProfileInputEnvelope
    connect?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MasterProfileUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ProjectCreateWithoutProfileInput, ProjectUncheckedCreateWithoutProfileInput> | ProjectCreateWithoutProfileInput[] | ProjectUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProfileInput | ProjectCreateOrConnectWithoutProfileInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutProfileInput | ProjectUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ProjectCreateManyProfileInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutProfileInput | ProjectUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutProfileInput | ProjectUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SavedPitchUpdateManyWithoutProfileNestedInput = {
    create?: XOR<SavedPitchCreateWithoutProfileInput, SavedPitchUncheckedCreateWithoutProfileInput> | SavedPitchCreateWithoutProfileInput[] | SavedPitchUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SavedPitchCreateOrConnectWithoutProfileInput | SavedPitchCreateOrConnectWithoutProfileInput[]
    upsert?: SavedPitchUpsertWithWhereUniqueWithoutProfileInput | SavedPitchUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: SavedPitchCreateManyProfileInputEnvelope
    set?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    disconnect?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    delete?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    connect?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    update?: SavedPitchUpdateWithWhereUniqueWithoutProfileInput | SavedPitchUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: SavedPitchUpdateManyWithWhereWithoutProfileInput | SavedPitchUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: SavedPitchScalarWhereInput | SavedPitchScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ProjectCreateWithoutProfileInput, ProjectUncheckedCreateWithoutProfileInput> | ProjectCreateWithoutProfileInput[] | ProjectUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProfileInput | ProjectCreateOrConnectWithoutProfileInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutProfileInput | ProjectUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ProjectCreateManyProfileInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutProfileInput | ProjectUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutProfileInput | ProjectUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SavedPitchUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<SavedPitchCreateWithoutProfileInput, SavedPitchUncheckedCreateWithoutProfileInput> | SavedPitchCreateWithoutProfileInput[] | SavedPitchUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SavedPitchCreateOrConnectWithoutProfileInput | SavedPitchCreateOrConnectWithoutProfileInput[]
    upsert?: SavedPitchUpsertWithWhereUniqueWithoutProfileInput | SavedPitchUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: SavedPitchCreateManyProfileInputEnvelope
    set?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    disconnect?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    delete?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    connect?: SavedPitchWhereUniqueInput | SavedPitchWhereUniqueInput[]
    update?: SavedPitchUpdateWithWhereUniqueWithoutProfileInput | SavedPitchUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: SavedPitchUpdateManyWithWhereWithoutProfileInput | SavedPitchUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: SavedPitchScalarWhereInput | SavedPitchScalarWhereInput[]
  }

  export type MasterProfileCreateNestedOneWithoutProjectsInput = {
    create?: XOR<MasterProfileCreateWithoutProjectsInput, MasterProfileUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: MasterProfileCreateOrConnectWithoutProjectsInput
    connect?: MasterProfileWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MasterProfileUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<MasterProfileCreateWithoutProjectsInput, MasterProfileUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: MasterProfileCreateOrConnectWithoutProjectsInput
    upsert?: MasterProfileUpsertWithoutProjectsInput
    connect?: MasterProfileWhereUniqueInput
    update?: XOR<XOR<MasterProfileUpdateToOneWithWhereWithoutProjectsInput, MasterProfileUpdateWithoutProjectsInput>, MasterProfileUncheckedUpdateWithoutProjectsInput>
  }

  export type MasterProfileCreateNestedOneWithoutPitchesInput = {
    create?: XOR<MasterProfileCreateWithoutPitchesInput, MasterProfileUncheckedCreateWithoutPitchesInput>
    connectOrCreate?: MasterProfileCreateOrConnectWithoutPitchesInput
    connect?: MasterProfileWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MasterProfileUpdateOneRequiredWithoutPitchesNestedInput = {
    create?: XOR<MasterProfileCreateWithoutPitchesInput, MasterProfileUncheckedCreateWithoutPitchesInput>
    connectOrCreate?: MasterProfileCreateOrConnectWithoutPitchesInput
    upsert?: MasterProfileUpsertWithoutPitchesInput
    connect?: MasterProfileWhereUniqueInput
    update?: XOR<XOR<MasterProfileUpdateToOneWithWhereWithoutPitchesInput, MasterProfileUpdateWithoutPitchesInput>, MasterProfileUncheckedUpdateWithoutPitchesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProjectCreateWithoutProfileInput = {
    id?: string
    title: string
    description: string
    image?: string | null
    outcome?: string | null
    year?: number | null
  }

  export type ProjectUncheckedCreateWithoutProfileInput = {
    id?: string
    title: string
    description: string
    image?: string | null
    outcome?: string | null
    year?: number | null
  }

  export type ProjectCreateOrConnectWithoutProfileInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProfileInput, ProjectUncheckedCreateWithoutProfileInput>
  }

  export type ProjectCreateManyProfileInputEnvelope = {
    data: ProjectCreateManyProfileInput | ProjectCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type SavedPitchCreateWithoutProfileInput = {
    id: string
    createdAt?: Date | string
    date: string
    starred?: boolean
    note?: string | null
    context: JsonNullValueInput | InputJsonValue
    pitch: JsonNullValueInput | InputJsonValue
    profileSnap: JsonNullValueInput | InputJsonValue
  }

  export type SavedPitchUncheckedCreateWithoutProfileInput = {
    id: string
    createdAt?: Date | string
    date: string
    starred?: boolean
    note?: string | null
    context: JsonNullValueInput | InputJsonValue
    pitch: JsonNullValueInput | InputJsonValue
    profileSnap: JsonNullValueInput | InputJsonValue
  }

  export type SavedPitchCreateOrConnectWithoutProfileInput = {
    where: SavedPitchWhereUniqueInput
    create: XOR<SavedPitchCreateWithoutProfileInput, SavedPitchUncheckedCreateWithoutProfileInput>
  }

  export type SavedPitchCreateManyProfileInputEnvelope = {
    data: SavedPitchCreateManyProfileInput | SavedPitchCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutProfileInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutProfileInput, ProjectUncheckedUpdateWithoutProfileInput>
    create: XOR<ProjectCreateWithoutProfileInput, ProjectUncheckedCreateWithoutProfileInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutProfileInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutProfileInput, ProjectUncheckedUpdateWithoutProfileInput>
  }

  export type ProjectUpdateManyWithWhereWithoutProfileInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutProfileInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    image?: StringNullableFilter<"Project"> | string | null
    outcome?: StringNullableFilter<"Project"> | string | null
    year?: IntNullableFilter<"Project"> | number | null
    profileId?: StringFilter<"Project"> | string
  }

  export type SavedPitchUpsertWithWhereUniqueWithoutProfileInput = {
    where: SavedPitchWhereUniqueInput
    update: XOR<SavedPitchUpdateWithoutProfileInput, SavedPitchUncheckedUpdateWithoutProfileInput>
    create: XOR<SavedPitchCreateWithoutProfileInput, SavedPitchUncheckedCreateWithoutProfileInput>
  }

  export type SavedPitchUpdateWithWhereUniqueWithoutProfileInput = {
    where: SavedPitchWhereUniqueInput
    data: XOR<SavedPitchUpdateWithoutProfileInput, SavedPitchUncheckedUpdateWithoutProfileInput>
  }

  export type SavedPitchUpdateManyWithWhereWithoutProfileInput = {
    where: SavedPitchScalarWhereInput
    data: XOR<SavedPitchUpdateManyMutationInput, SavedPitchUncheckedUpdateManyWithoutProfileInput>
  }

  export type SavedPitchScalarWhereInput = {
    AND?: SavedPitchScalarWhereInput | SavedPitchScalarWhereInput[]
    OR?: SavedPitchScalarWhereInput[]
    NOT?: SavedPitchScalarWhereInput | SavedPitchScalarWhereInput[]
    id?: StringFilter<"SavedPitch"> | string
    createdAt?: DateTimeFilter<"SavedPitch"> | Date | string
    date?: StringFilter<"SavedPitch"> | string
    starred?: BoolFilter<"SavedPitch"> | boolean
    note?: StringNullableFilter<"SavedPitch"> | string | null
    context?: JsonFilter<"SavedPitch">
    pitch?: JsonFilter<"SavedPitch">
    profileSnap?: JsonFilter<"SavedPitch">
    profileId?: StringFilter<"SavedPitch"> | string
  }

  export type MasterProfileCreateWithoutProjectsInput = {
    id?: string
    userId: string
    profileName?: string
    isDefault?: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills?: MasterProfileCreateskillsInput | string[]
    plan?: string
    pitches?: SavedPitchCreateNestedManyWithoutProfileInput
  }

  export type MasterProfileUncheckedCreateWithoutProjectsInput = {
    id?: string
    userId: string
    profileName?: string
    isDefault?: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills?: MasterProfileCreateskillsInput | string[]
    plan?: string
    pitches?: SavedPitchUncheckedCreateNestedManyWithoutProfileInput
  }

  export type MasterProfileCreateOrConnectWithoutProjectsInput = {
    where: MasterProfileWhereUniqueInput
    create: XOR<MasterProfileCreateWithoutProjectsInput, MasterProfileUncheckedCreateWithoutProjectsInput>
  }

  export type MasterProfileUpsertWithoutProjectsInput = {
    update: XOR<MasterProfileUpdateWithoutProjectsInput, MasterProfileUncheckedUpdateWithoutProjectsInput>
    create: XOR<MasterProfileCreateWithoutProjectsInput, MasterProfileUncheckedCreateWithoutProjectsInput>
    where?: MasterProfileWhereInput
  }

  export type MasterProfileUpdateToOneWithWhereWithoutProjectsInput = {
    where?: MasterProfileWhereInput
    data: XOR<MasterProfileUpdateWithoutProjectsInput, MasterProfileUncheckedUpdateWithoutProjectsInput>
  }

  export type MasterProfileUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
    pitches?: SavedPitchUpdateManyWithoutProfileNestedInput
  }

  export type MasterProfileUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
    pitches?: SavedPitchUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type MasterProfileCreateWithoutPitchesInput = {
    id?: string
    userId: string
    profileName?: string
    isDefault?: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills?: MasterProfileCreateskillsInput | string[]
    plan?: string
    projects?: ProjectCreateNestedManyWithoutProfileInput
  }

  export type MasterProfileUncheckedCreateWithoutPitchesInput = {
    id?: string
    userId: string
    profileName?: string
    isDefault?: boolean
    fullName: string
    jobTitle: string
    bio: string
    skills?: MasterProfileCreateskillsInput | string[]
    plan?: string
    projects?: ProjectUncheckedCreateNestedManyWithoutProfileInput
  }

  export type MasterProfileCreateOrConnectWithoutPitchesInput = {
    where: MasterProfileWhereUniqueInput
    create: XOR<MasterProfileCreateWithoutPitchesInput, MasterProfileUncheckedCreateWithoutPitchesInput>
  }

  export type MasterProfileUpsertWithoutPitchesInput = {
    update: XOR<MasterProfileUpdateWithoutPitchesInput, MasterProfileUncheckedUpdateWithoutPitchesInput>
    create: XOR<MasterProfileCreateWithoutPitchesInput, MasterProfileUncheckedCreateWithoutPitchesInput>
    where?: MasterProfileWhereInput
  }

  export type MasterProfileUpdateToOneWithWhereWithoutPitchesInput = {
    where?: MasterProfileWhereInput
    data: XOR<MasterProfileUpdateWithoutPitchesInput, MasterProfileUncheckedUpdateWithoutPitchesInput>
  }

  export type MasterProfileUpdateWithoutPitchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
    projects?: ProjectUpdateManyWithoutProfileNestedInput
  }

  export type MasterProfileUncheckedUpdateWithoutPitchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fullName?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    skills?: MasterProfileUpdateskillsInput | string[]
    plan?: StringFieldUpdateOperationsInput | string
    projects?: ProjectUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProjectCreateManyProfileInput = {
    id?: string
    title: string
    description: string
    image?: string | null
    outcome?: string | null
    year?: number | null
  }

  export type SavedPitchCreateManyProfileInput = {
    id: string
    createdAt?: Date | string
    date: string
    starred?: boolean
    note?: string | null
    context: JsonNullValueInput | InputJsonValue
    pitch: JsonNullValueInput | InputJsonValue
    profileSnap: JsonNullValueInput | InputJsonValue
  }

  export type ProjectUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProjectUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProjectUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SavedPitchUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    context?: JsonNullValueInput | InputJsonValue
    pitch?: JsonNullValueInput | InputJsonValue
    profileSnap?: JsonNullValueInput | InputJsonValue
  }

  export type SavedPitchUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    context?: JsonNullValueInput | InputJsonValue
    pitch?: JsonNullValueInput | InputJsonValue
    profileSnap?: JsonNullValueInput | InputJsonValue
  }

  export type SavedPitchUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    context?: JsonNullValueInput | InputJsonValue
    pitch?: JsonNullValueInput | InputJsonValue
    profileSnap?: JsonNullValueInput | InputJsonValue
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MasterProfileCountOutputTypeDefaultArgs instead
     */
    export type MasterProfileCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MasterProfileCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MasterProfileDefaultArgs instead
     */
    export type MasterProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MasterProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectDefaultArgs instead
     */
    export type ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SavedPitchDefaultArgs instead
     */
    export type SavedPitchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SavedPitchDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}