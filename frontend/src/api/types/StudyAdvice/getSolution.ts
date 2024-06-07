export interface SolutionRequestData {
    author: Author;
    content: string;
    solutionId: number;
    approval: number;
    releaseTime: string;
    solutionIssueId: number;
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
export type SolutionResponseData = ApiResponseData<{
    data:SolutionRequestData[];
    code:number;
    msg:string;
}>
