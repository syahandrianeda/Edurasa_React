import type { DocumentMigration }
from "../DocumentMigration";

export class InitialMigration
implements DocumentMigration {

    fromVersion =
        "1.0.0";

    toVersion =
        "1.0.1";

    migrate(
        payload:
            Record<string, unknown>
    ): Record<string, unknown> {

        return {

            ...payload,

            version:
                this.toVersion

        };

    }

}