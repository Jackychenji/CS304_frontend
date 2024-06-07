import {IssueRequestData} from "@/api/types/StudyAdvice/getIssue.ts";

export interface IssueEditRequestData {
    issueId: number;
    title: string;
    content: string;
}

// Post API的返回数据类型

export type IssueEditResponseData = ApiResponseData<{
    data:IssueRequestData;
    code:number;
    msg:string;
}>

