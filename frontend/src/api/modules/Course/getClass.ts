import { request } from "@/utils/service.ts"
import {ClassResponseData} from "@/api/types/Course/getClass.ts"

/** 获取课表 */
export function classGetApi() {
    return request<ClassResponseData>({
        url: "/class/findAll",
        method: "get",
    })
}

