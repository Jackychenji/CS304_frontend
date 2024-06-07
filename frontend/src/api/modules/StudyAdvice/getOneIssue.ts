import { request } from "@/utils/service.ts"
import { IssueResponseData } from "@/api/types/StudyAdvice/getOneIssue.ts"


export function issueGetApi(courseCode:string) {
    return request<IssueResponseData>({
        url: `/issue/findByIssueId/${courseCode}`,
        method: "get",
    })
}

