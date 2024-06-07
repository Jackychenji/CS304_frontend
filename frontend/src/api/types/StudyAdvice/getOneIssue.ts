export interface IssueRequestData {
    content: string;
    issueCourseCode: string;
    issueId: number;
    open: boolean;
    opener: Opener;
    releaseTime: string;
    title: string;
    vote: number;
}

export interface Opener {
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

export type IssueResponseData = ApiResponseData<{
    data:IssueRequestData;
    code:number;
    msg:string;
}>