import { request } from "@/utils/service.ts"
import {ClassResponseData} from "@/api/types/Course/getOneClass.ts"

/** 获取课表 */
export function classGetApi(classId: number) {
    return request<ClassResponseData>({
        url: `/class/findByClassId/${classId}`,
        method: "get",
    })
}

