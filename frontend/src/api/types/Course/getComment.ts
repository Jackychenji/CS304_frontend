export interface CommentRequestData {
    commentId: number,
    author: Author,
    content: string,
    releaseTime: string,
    commentClass: number
}

export interface Author {
    avatar: null;
    email: string;
    followCourses: string[];
    password: string;
    recommendClasses: string[];
    role: string;
    unrecommendClasses: string[];
    userId: string;
    userName: string;

}


export type CommentResponseData = ApiResponseData<{
    data:CommentRequestData[];
    code:number;
    msg:string;
}>
