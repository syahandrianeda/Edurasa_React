import { type Draft } from "immer";

export interface ReducerCommand<TState, TAction> {

    execute(
        state: Draft<TState>,
        action: TAction,
    ): Draft<TState> | TState | void;

}