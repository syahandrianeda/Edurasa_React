import type { QuestionNode } from "~/domain/editor/document/question-node";
import { SectionRenderer } from "./SectionRenderer";

interface Props {

    question: QuestionNode;

    index:number;

}

export function QuestionRenderer({

    question,

    index

}:Props)
{

    return (

        <div>

            <h3>

                Soal
                {" "}
                {index + 1}

            </h3>

            {
                question.stimulus &&
                (
                    <SectionRenderer
                        section={
                            question
                                .stimulus
                        }
                    />
                )
            }

            {
                question.pertanyaan &&
                (
                    <SectionRenderer
                        section={
                            question
                                .pertanyaan
                        }
                    />
                )
            }

            {
                question.interaction &&
                (
                    <pre>

                        {
                            JSON.stringify(

                                question
                                    .interaction,

                                null,

                                2

                            )
                        }

                    </pre>
                )
            }

        </div>

    );

}