import type { SelectionPoint }
from "./SelectionPoint";

export interface SelectionRange {

    anchor: SelectionPoint;

    focus: SelectionPoint;

}