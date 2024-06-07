import { request } from "@/utils/service.ts"
import {deleteSolutionResponseData} from "@/api/types/StudyAdvice/deleteSolution.ts"

export function deleteSolutionApi(solutionId: string ) {
    return request<deleteSolutionResponseData>({
        url: `/solution/deleteById/${solutionId}`,
        method: "delete"
    })
}

