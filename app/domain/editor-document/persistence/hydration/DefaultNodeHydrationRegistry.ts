import { NodeHydrationRegistry }
from "./NodeHydrationRegistry";

import { ParagraphHydrator }
from "./ParagraphHydrator";

import { ImageHydrator }
from "./ImageHydrator";

import { TableHydrator }
from "./TableHydrator";

import { EquationHydrator }
from "./EquationHydrator";

import { ListHydrator }
from "./ListHydrator";

import { NumberListHydrator }
from "./NumberListHydrator";

export function
createDefaultNodeHydrationRegistry()
{
    const registry =
        new NodeHydrationRegistry();

    registry.register(
        "paragraph",
        new ParagraphHydrator()
    );

    registry.register(
        "image",
        new ImageHydrator()
    );

    registry.register(
        "table",
        new TableHydrator()
    );

    registry.register(
        "equation",
        new EquationHydrator()
    );

    registry.register(
        "list",
        new ListHydrator()
    );

    registry.register(
        "number-list",
        new NumberListHydrator()
    );

    return registry;
}