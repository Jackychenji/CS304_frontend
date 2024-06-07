export interface CourseRequestData {
    courseCode: string,
    courseName: string,
    credit: string,
    courseIntro: string,
    courseType: string,
    scoringType: string,
    department: string,
    prerequisite: string
}


export type CourseResponseData = ApiResponseData<{
    data: CourseRequestData;
    code:number;
    msg:string;
}>
