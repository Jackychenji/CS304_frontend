export interface SolutionVoteRequestData {
    solutionId: number;
    userId: string;
    vote: number;
}

// Post API的返回数据类型

export type SolutionVoteResponseData = ApiResponseData<{
    data:number;
    code:number;
    msg:string;
}>

