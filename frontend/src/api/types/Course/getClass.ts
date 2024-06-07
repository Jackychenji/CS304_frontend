export interface ClassRequestData {
    classId: number;
    className: string;
    instructor: string;
    semester: string;
    language: string;
    difficultyScore: number;
    gradingScore: number;
    workloadScore: number;
    harvestScore: number;
    averageScore: number;
    recommend: number;
    unrecommend: number;
    classCourse: CourseInfo; // 使用 CourseInfo 类型
}

interface CourseInfo {
    courseCode: string;
    courseName: string;
    credit: string;
    courseIntro: string;
    courseType: string;
    scoringType: string;
    department: string;
    prerequisite: string;
}

export type ClassResponseData = ApiResponseData<{
    data: ClassRequestData[];
    code:number;
    msg:string;
}>
