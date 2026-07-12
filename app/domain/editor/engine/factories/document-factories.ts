import type { EditorDocument } from "~/domain/editor-document/EditorDocument";
import type { QuestionBankDocument } from "../../document/question-bank-document";
import { CURRENT_DOCUMENT_VERSION } from "../serializer/version/current-version";


export class DocumentFactory {

    // static create(): QuestionBankDocument {
    //     return {
    //         version: CURRENT_DOCUMENT_VERSION,
    //         mediaResources: [],
    //         questions: [],
    //     };
    // }
    static create(): EditorDocument {

        return {

            version: "1.0",

            metadata: {

                title: "",

                // description: "",
                
                    // title: '', 
                    author: '',
                    createdAt: '',
                    updatedAt: ''
                

            },

            children: []

        };

    }

}