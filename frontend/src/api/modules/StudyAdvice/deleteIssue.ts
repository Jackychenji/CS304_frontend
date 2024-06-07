import { request } from "@/utils/service.ts"
import {deleteIssueResponseData} from "@/api/types/StudyAdvice/deleteIssue.ts"

export function deleteIssueApi(issueId: string ) {
    return request<deleteIssueResponseData>({
        url: `/issue/deleteById/${issueId}`,
        method: "delete"
    })
}

