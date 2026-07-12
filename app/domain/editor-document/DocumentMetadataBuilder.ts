import type { DocumentMetadata }
from "./DocumentMetadata";

import type { DocumentMetadataResult }
from "./DocumentMetadataResult";

export class DocumentMetadataBuilder{

    build():DocumentMetadataResult{

        const now = new Date().toISOString();

        const metadata:DocumentMetadata={

            title:"",

            author:"",

            createdAt:now,

            updatedAt:now

        };

        return{

            success:true,

            metadata

        };

    }

}