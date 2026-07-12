import { NodeRegistry } from "./registry-node";

export function
createDefaultNodeRegistry()
{
    const registry =
        new NodeRegistry();

    registry.register({
        type:"paragraph",
        displayName:"Paragraph"
    });

    registry.register({
        type:"image",
        displayName:"Image"
    });

    registry.register({
        type:"table",
        displayName:"Table"
    });

    registry.register({
        type:"equation",
        displayName:"Equation"
    });

    registry.register({
        type:"list",
        displayName:"List"
    });

    registry.register({
        type:"number-list",
        displayName:"Number List"
    });

    return registry;
}