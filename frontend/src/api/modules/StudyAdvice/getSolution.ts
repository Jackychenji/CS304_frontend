import { request } from "@/utils/service.ts"
import {SolutionResponseData} from "@/api/types/StudyAdvice/getSolution.ts"

export function solutionGetApi(issueId: string) {
    return request<SolutionResponseData>({
        url: `/solution/findByIssueId/${issueId}`,
        method: "get"
    })
}

