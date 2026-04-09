import type { Request } from "express";

// Generic typed request with params
export type TypedRequestParams<T> = Request<T>;