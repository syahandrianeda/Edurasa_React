export class SerializeException extends Error {

    constructor(message: string) {
        super(message);

        this.name = "SerializeException";
    }

}