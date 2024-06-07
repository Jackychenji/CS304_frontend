import { request } from "@/utils/service.ts"
import {CourseResponseData} from "@/api/types/Course/getCourse.ts"

/** 获取课表 */
export function courseGetApi() {
    return request<CourseResponseData>({
        url: "/course/findAll",
        method: "get",
    })
}

