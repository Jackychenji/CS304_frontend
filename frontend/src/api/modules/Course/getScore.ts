import {request} from "@/utils/service.ts"
import {ScoreResponseData} from "@/api/types/Course/getScore.ts"

/** 获取课表 */
export function scoreGetApi(classId: number, userId: string) {
    return request<ScoreResponseData>({
        url: `/score/findByClassIdAndUserId/${classId}/${userId}`,
        method: "get",

    })
}

