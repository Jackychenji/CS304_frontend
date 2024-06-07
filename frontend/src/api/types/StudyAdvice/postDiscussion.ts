export interface DiscussionPostRequestData {
    content: string;
    solutionId: string;
    authorId: string;
    receiverId
}



// Post API的返回数据类型

export type DiscussionPostResponseData = ApiResponseData<{
    data:DiscussionPostRequestData;
    code:number;
    msg:string;
}>

