import { request } from "@/utils/service.ts"
import {IssueResponseData} from "@/api/types/StudyAdvice/getIssue.ts"

/** 获取课表 */
export function issueGetApi() {
    return request<IssueResponseData>({
        url: "/issue/findAll",
        method: "get",
    })
}

