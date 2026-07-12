import type { DocumentMigration } from "./DocumentMigration";

export class DocumentMigrationRegistry {

    private migrations:
        DocumentMigration[] = [];

    register(
        migration:
            DocumentMigration
    ): void {

        this.migrations.push(
            migration
        );

    }

    getMigration(
        fromVersion:
            string
    ): DocumentMigration | undefined {

        return this.migrations.find(

            migration =>

                migration
                    .fromVersion ===
                fromVersion

        );

    }

}