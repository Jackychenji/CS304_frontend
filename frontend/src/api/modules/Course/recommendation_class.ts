// api/courseApi.ts
import { request } from "@/utils/service";  // 调整路径根据您的项目结构
import type * as ClassRecommendation from "../../types/Course/recommendation_class.ts";



export function fetchRecommendedCoursesApi(data: ClassRecommendation.ClassRecommendationRequestData) {
    return request<ClassRecommendation.ClassRecommmendationResponseData>({
        url: '/class/getRecommendation',
        method: 'post',
        data
    });
}


