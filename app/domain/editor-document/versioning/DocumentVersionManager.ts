import type { DocumentMigrationRegistry }
from "./DocumentMigrationRegistry";

export class DocumentVersionManager {

    constructor(

        private registry:
            DocumentMigrationRegistry,

        private currentVersion:
            string

    ) {}

    migrateToCurrentVersion(
        payload:
            Record<string, unknown>
    ): Record<string, unknown> {

        let document =
            structuredClone(
                payload
            );

        let version =
            String(
                document.version
            );

        while (
            version !==
            this.currentVersion
        ) {

            const migration =
                this.registry
                    .getMigration(
                        version
                    );

            if (
                !migration
            ) {

                throw new Error(

                    `No migration found for version ${version}`

                );

            }

            document =
                migration
                    .migrate(
                        document
                    );

            version =
                migration
                    .toVersion;

        }

        return document;

    }

}