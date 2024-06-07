import {SolutionRequestData} from "@/api/types/StudyAdvice/getSolution.ts";

export type deleteSolutionResponseData = ApiResponseData<{
    data:SolutionRequestData;
    code:number;
    msg:string;
}>

