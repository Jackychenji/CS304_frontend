import { request } from "@/utils/service.ts"
import {deleteDiscussionResponseData} from "@/api/types/StudyAdvice/deleteDiscussion.ts"

export function deleteDiscussionApi(discussionId: string ) {
    return request<deleteDiscussionResponseData>({
        url: `/discussion/deleteById/${discussionId}`,
        method: "delete"
    })
}

