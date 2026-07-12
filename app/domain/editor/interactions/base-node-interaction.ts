export interface BaseInteractionNode {
    interactionType: string;
}
export interface OptionGroupNode extends BaseInteractionNode {
    interactionType: "option-group";
    options:string[];
}
export interface TrueFalseNode extends BaseInteractionNode {
    interactionType: "true-false";
}
export interface MatchingNode extends BaseInteractionNode {
    interactionType: "matching";
}
export interface ResponseNode extends BaseInteractionNode {
    interactionType: "response";
}
export type InteractionNode =
    | OptionGroupNode
    | TrueFalseNode
    | MatchingNode
    | ResponseNode;