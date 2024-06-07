import { request } from "@/utils/service.ts"
import {JudgeResponseData,JudgeRequestData} from "@/api/types/Course/judgeClass.ts"

/** 获取课表 */
export function JudgePostApi(scores: JudgeRequestData) {
    return request<JudgeResponseData>({
        url: `/score/addOne`,
        method: "post",
        data:scores
    })
}

