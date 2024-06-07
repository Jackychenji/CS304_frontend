import { request } from "@/utils/service.ts"
import {SolutionVoteResponseData,SolutionVoteRequestData} from "@/api/types/StudyAdvice/voteSolution.ts"

export function SolutionVoteApi(reply: SolutionVoteRequestData) {
    return request<SolutionVoteResponseData>({
        url: `/solution/vote`,
        method: "post",
        data:reply
    })
}

