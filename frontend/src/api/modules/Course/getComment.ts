import { request } from "@/utils/service.ts"
import {CommentResponseData} from "@/api/types/Course/getComment.ts"

/** 获取课表 */
export function commentGetApi(classId: number) {
    return request<CommentResponseData>({
        url: `/comment/findByClassId/${classId}`,
        method: "get"
    })
}

