import { request } from "@/utils/service.ts"
import {DiscussionResponseData} from "@/api/types/StudyAdvice/getDiscussion.ts"

export function discussionGetApi(solutionId: number) {
    return request<DiscussionResponseData>({
        url: `/discussion/findBySolutionId/${solutionId}`,
        method: "get"
    })
}

