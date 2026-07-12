import type { EditorDocument } from "./EditorDocument";
import type { EditorDocumentResult } from "./EditorDocumentResult";
import { DocumentMetadataBuilder } from "./DocumentMetadataBuilder";

export class EditorDocumentBuilder{

    build():EditorDocumentResult{

        const metadata =
            new DocumentMetadataBuilder()
                .build();

        if(
            !metadata.success ||
            !metadata.metadata
        ){

            return{

                success:false,

                message:"Metadata gagal dibuat."

            };

        }

        // const document:EditorDocument={

        //     version:"1.0",

        //     metadata:metadata.metadata,

        //     children:[]

        // };
        const document:EditorDocument={

            version:"1.0",

            metadata:metadata.metadata,

            children:[
                {
                    id: crypto.randomUUID(),

                    type:"paragraph",

                    children:[
                        {
                            type:"text",

                            text:""
                        }
                    ]
                }
            ]

        };
        return{

            success:true,

            document

        };

    }

}