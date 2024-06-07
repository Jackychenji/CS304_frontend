export interface JudgeRequestData {
    difficultyScore: number;
    gradingScore: number;
    workloadScore: number;
    harvestScore: number;
    classId: number;
    userId: string;
}

// Post API的返回数据类型

export type JudgeResponseData = ApiResponseData<{
    data:JudgeRequestData;
    code:number;
    msg:string;
}>

