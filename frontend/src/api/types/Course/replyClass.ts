export interface ReplyClassRequestData {
    authorId: string,
    content: string,
    commentId: number
    receiverId: string
}

// Post API的返回数据类型

export type ReplyClassResponseData = ApiResponseData<{
    data:ReplyClassRequestData;
    code:number;
    msg:string;
}>

