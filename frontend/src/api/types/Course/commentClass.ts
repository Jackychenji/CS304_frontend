export interface CommentClassRequestData {
    authorId: string,
    content: string,
    classId: number

}

// Post API的返回数据类型

export type CommentClassResponseData = ApiResponseData<{
    data:CommentClassRequestData;
    code:number;
    msg:string;
}>

