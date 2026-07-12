import type { EngineQuestionBankService } from "./EngineQuestionBankService";

export interface EngineQuestionBankServiceResult{

    success:boolean;
    service?: EngineQuestionBankService;
    message?:string;

}