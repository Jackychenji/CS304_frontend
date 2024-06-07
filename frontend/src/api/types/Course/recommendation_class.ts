export interface ClassCourse {
    courseCode: string;
    courseName: string;
    credit: string;
    courseIntro: string;
    courseType: string;
    scoringType: string;
    department: string;
    prerequisite: string;
}

export interface Class {
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
    classCourse: ClassCourse;
}

export interface Type {
    type : Class[]
}


export interface ClassRecommendationRequestData {
    /** 专业 */
    major: string
}
export type ClassRecommmendationResponseData = ApiResponseData<{data:Type}>