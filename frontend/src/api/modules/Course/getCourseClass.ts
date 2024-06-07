import { request } from "@/utils/service.ts"
import {ClassResponseData} from "@/api/types/Course/getCourseClass.ts"

/** 获取课表 */
export function courseClassApi(courseCode: string) {
    return request<ClassResponseData>({
        url: `/class/findCourseClasses/${courseCode}`,
        method: "get",
    })
}




