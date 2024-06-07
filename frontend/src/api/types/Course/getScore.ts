export interface ScoreRequestData {
    difficultyScore?: number;
    gradingScore?: number;
    harvestScore?: number;
    scoreClass?: number;
    scoreUser?: string;
    socreId?: number;
    workloadScore?: number;
}



export type ScoreResponseData = ApiResponseData<{
    data:ScoreRequestData;
    code:number;
    msg:string;
}>