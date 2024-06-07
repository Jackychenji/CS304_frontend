export interface DiscussionRequestData {
    author: Author;
    content: string;
    discussionId: number;
    parentSolutionId: number;
    receiver: Receiver;
    releaseTime: string;
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

export type DiscussionResponseData = ApiResponseData<{
    data:DiscussionRequestData[];
    code:number;
    msg:string;
}>