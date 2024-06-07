import { request } from "@/utils/service.ts"
import {IssueResponseData} from "@/api/types/StudyAdvice/getMyIssue.ts"

/** 获取课表 */
export function issueGetApi(userId:string) {
    return request<IssueResponseData>({
        url: `/issue/findByOpenerId/${userId}`,
        method: "get",
    })
}

