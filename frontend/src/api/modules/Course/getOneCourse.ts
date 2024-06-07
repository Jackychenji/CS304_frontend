import { request } from "@/utils/service.ts"
import {CourseResponseData} from "@/api/types/Course/getOneCourse.ts"

export function courseGetApi(courseCode: string) {
    return request<CourseResponseData>({
        url: `/course/findByCourseCode/${courseCode}`,
        method: "get",
    })
}




