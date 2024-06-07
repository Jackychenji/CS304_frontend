export interface IssueRequestData {
    content: string;
    courseCode: string;
    openerId: string;
    title: string;
}



// Post API的返回数据类型

export type IssueResponseData = ApiResponseData<{
    data:IssueRequestData;
    code:number;
    msg:string;
}>

