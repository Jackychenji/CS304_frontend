export interface SolutionPostRequestData {
    content: string;
    issueId: string;
    authorId: string;
}



// Post API的返回数据类型

export type SolutionPostResponseData = ApiResponseData<{
    data:SolutionPostRequestData;
    code:number;
    msg:string;
}>

