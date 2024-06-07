import { request } from "@/utils/service.ts"
import {ReplyResponseData} from "@/api/types/Course/getReply.ts"

export function replyGetApi(commentId: number) {
    return request<ReplyResponseData>({
        url: `/reply/findByCommentId/${commentId}`,
        method: "get"
    })
}

