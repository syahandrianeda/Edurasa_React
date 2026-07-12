export interface Migration {

    from: string;

    to: string;

    migrate(
        document: any
    ): any;

}