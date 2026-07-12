// import {
//     DocumentMigrationRegistry
// }
// from "./DocumentMigrationRegistry";

import { DocumentMigrationRegistry } from "../DocumentMigrationRegistry";
import { InitialMigration } from "./InitialMigration";

// import {
//     InitialMigration
// }
// from "./migrations/InitialMigration";

export function
createDefaultDocumentMigrationRegistry()
{
    const registry =
        new DocumentMigrationRegistry();

    registry.register(

        new InitialMigration()

    );

    return registry;
}