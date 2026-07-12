export class NodePathBuilder {

    static stimulus(
        questionIndex:number
    ): string {

        return `questions[${questionIndex}].stimulus`;

    }

    static pertanyaan(
        questionIndex:number
    ): string {

        return `questions[${questionIndex}].pertanyaan`;

    }

    static interaction(
        questionIndex:number
    ): string {

        return `questions[${questionIndex}].interaction`;

    }

    static pembahasan(
        questionIndex:number
    ): string {

        return `questions[${questionIndex}].pembahasan`;
    }

}