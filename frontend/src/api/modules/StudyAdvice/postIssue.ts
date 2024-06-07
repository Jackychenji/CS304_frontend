import { request } from "@/utils/service.ts"
import {IssueResponseData,IssueRequestData} from "@/api/types/StudyAdvice/postIssue.ts"

export function IssuePostApi(issue: IssueRequestData) {
    return request<IssueResponseData>({
        url: `/issue/addOne`,
        method: "post",
        data:issue
    })
}

