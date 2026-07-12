import type { EditorApplication }
from "~/domain/editor-document/application/EditorApplication";

import type { EditorHostApi }
from "~/domain/editor-host/public-api/EditorHostApi";

import type { EditorPresentationApi }
from "~/domain/editor-presentation/public-api/EditorPresentationApi";

import type { EditorFacade }
from "../EditorFacade";

export interface EditorPlatform{

    readonly application:EditorApplication;

    readonly presentation:EditorPresentationApi;

    readonly host:EditorHostApi;

    readonly facade:EditorFacade;

}