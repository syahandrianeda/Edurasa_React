export interface DocumentMigration {

    fromVersion: string;

    toVersion: string;

    migrate(
        payload: Record<string, unknown>
    ): Record<string, unknown>;

}