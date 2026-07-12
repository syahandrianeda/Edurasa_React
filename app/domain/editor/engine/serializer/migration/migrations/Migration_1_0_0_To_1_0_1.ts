import type { Migration } from "../migration";

export class
Migration_1_0_0_To_1_0_1
implements Migration
{
    from = "1.0.0";

    to = "1.0.1";

    migrate(
        document: any
    ): any {

        document.version =
            "1.0.1";

        return document;

    }

}