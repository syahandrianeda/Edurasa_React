import type { MigrationRegistry } from "./migration-registry";

export class MigrationRunner {

    constructor(
        private registry:
            MigrationRegistry
    ) {}

    run(
        document: any
    ): any {

        let current =
            document;

        const migrations =
            this.registry
                .getMigrations();

        for (
            const migration
            of migrations
        ) {

            if (
                current.version ===
                migration.from
            ) {

                current =
                    migration.migrate(
                        current
                    );

            }

        }

        return current;

    }

}