import {IssueRequestData} from "@/api/types/StudyAdvice/getIssue.ts";

export type deleteIssueResponseData = ApiResponseData<{
    data:IssueRequestData;
    code:number;
    msg:string;
}>

