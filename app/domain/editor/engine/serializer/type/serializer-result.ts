import type { SerializedDocument } from "./serialized-document";

export interface SerializerResult
{
    success:boolean;

    payload?:SerializedDocument;

    error?:string;
}