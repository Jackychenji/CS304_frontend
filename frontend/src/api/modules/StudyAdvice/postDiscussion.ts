import { request } from "@/utils/service.ts"
import {DiscussionPostResponseData,DiscussionPostRequestData} from "@/api/types/StudyAdvice/postDiscussion.ts"

export function discussionPostApi(discussion: DiscussionPostRequestData) {
    return request<DiscussionPostResponseData>({
        url: `/discussion/addOne`,
        method: "post",
        data:discussion
    })
}

