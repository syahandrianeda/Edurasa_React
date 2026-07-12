import type { DocumentMetadata }
from "./DocumentMetadata";

export interface DocumentMetadataResult{

    success:boolean;

    metadata?:DocumentMetadata;

    message?:string;

}