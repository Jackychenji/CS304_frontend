export interface IssueVoteRequestData {
    issueId: number;
    userId: string;
    vote: number;
}

// Post API的返回数据类型

export type IssueVoteResponseData = ApiResponseData<{
    data:number;
    code:number;
    msg:string;
}>

