// import {Type} from "@/api/types/Course/recommendation_class.ts";

export interface MaterialDownloadRequestData{
    materialId: string
}

export interface MaterialAddOneRequestData{
    materialType: string;
    materialName: string;
    providerId: string;
    providerName: string;
    materialCourse: string;
}

export interface findCourseMaterialRequestData{

    courseCode: string;
}


export interface MaterialUploadRequestData{
    fileData: string;
}


export interface Material {
    materialCourse: MaterialCourse;
    materialId: number;
    materialName: string;
    materialType: string;
    providerId: string;
    providerName: string;
    releaseTimexx: string;
}

export interface MaterialCourse {
    courseCode: string;
    courseIntro: string;
    courseName: string;
    courseType: string;
    credit: string;
    department: string;
    prerequisite: string;
    scoringType: string;
}

export type findCourseMaterialResponseData = ApiResponseData<{data:Material}>