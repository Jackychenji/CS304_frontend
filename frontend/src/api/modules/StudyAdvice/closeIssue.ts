import { request } from "@/utils/service.ts"
import {IssueCloseResponseData} from "@/api/types/StudyAdvice/closeIssue.ts"

export function IssueCloseApi(issueId: string) {
    return request<IssueCloseResponseData>({
        url: `/issue/close/${issueId}`,
        method: "get",
    })
}

