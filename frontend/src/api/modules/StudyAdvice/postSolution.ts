import { request } from "@/utils/service.ts"
import {SolutionPostResponseData,SolutionPostRequestData} from "@/api/types/StudyAdvice/postSolution.ts"

export function SolutionPostApi(solution: SolutionPostRequestData) {
    return request<SolutionPostResponseData>({
        url: `/solution/addOne`,
        method: "post",
        data:solution
    })
}

