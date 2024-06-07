import { request } from "@/utils/service.ts"
import {IssueOpenResponseData} from "@/api/types/StudyAdvice/openIssue.ts"

export function IssueOpenApi(issueId: string) {
    return request<IssueOpenResponseData>({
        url: `/issue/reopen/${issueId}`,
        method: "get",

    })
}

