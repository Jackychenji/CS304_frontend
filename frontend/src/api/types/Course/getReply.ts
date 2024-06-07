export interface ReplyRequestData {
    author: Author;
    content: string;
    parentCommentId: number;
    receiver: Receiver;
    releaseTime: string;
    replyId: number;
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

export interface Receiver {
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


export type ReplyResponseData = ApiResponseData<{
    data:ReplyRequestData[];
    code:number;
    msg:string;
}>
