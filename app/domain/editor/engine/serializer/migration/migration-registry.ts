import type { Migration } from "./migration";


export class MigrationRegistry {

    private migrations:
        Migration[] = [];

    register(
        migration: Migration
    ): void {

        this.migrations.push(
            migration
        );

    }

    getMigrations():
        Migration[]
    {

        return this.migrations;

    }

}