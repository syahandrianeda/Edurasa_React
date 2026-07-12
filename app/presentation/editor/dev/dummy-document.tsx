import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";

export const dummyDocument:
    QuestionBankDocument =
{
    version: "1.0.0",

    mediaResources: [],

    questions: [

        {

            id: "q-1",

            metadata: {} as never,

            stimulus: {
                id: "section-1",

                type: "stimulus",

                visibility: 'public',
                

                // content: [
                children: [

                    {

                        id: "p-1",

                        type: "paragraph",

                        children: [

                            {

                                type: "text",

                                text:
                                    "Perhatikan teks berikut."

                            }

                        ]

                    }

                ]

            },

            pertanyaan: {

                id: "section-2",

                visibility: 'public',
                
                type: "pertanyaan",

                children: [

                    {

                        id: "p-2",

                        type: "paragraph",

                        children: [

                            {

                                type: "text",

                                text:
                                    "Berapakah hasil 1 + 1 ?"

                            }

                        ]

                    }

                ]

            }

        }

    ]

};