import type { EditorDocument }
from "../../EditorDocument";

import type { EditorPersistenceResult }
from "./EditorPersistenceResult";

export interface EditorPersistencePort{

    save(

        document:EditorDocument

    ):EditorPersistenceResult;

    load(

        id:string

    ):EditorPersistenceResult;

}