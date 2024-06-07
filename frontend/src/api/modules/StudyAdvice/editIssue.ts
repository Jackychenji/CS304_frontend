import { request } from "@/utils/service.ts"
import {IssueEditResponseData,IssueEditRequestData} from "@/api/types/StudyAdvice/editIssue.ts"

export function IssueEditApi(edit: IssueEditRequestData) {
    return request<IssueEditResponseData>({
        url: `/issue/editOne`,
        method: "post",
        data:edit
    })
}

