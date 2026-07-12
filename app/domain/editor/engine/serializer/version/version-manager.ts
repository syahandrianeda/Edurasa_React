import { CURRENT_DOCUMENT_VERSION } from "./current-version";


export class VersionManager {

    getCurrentVersion(): string {

        return CURRENT_DOCUMENT_VERSION;

    }

    isCurrentVersion(
        version: string
    ): boolean {

        return (
            version ===
            CURRENT_DOCUMENT_VERSION
        );

    }

}