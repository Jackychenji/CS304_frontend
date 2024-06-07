import { request } from "@/utils/service.ts"
import {deleteReplyResponseData} from "@/api/types/Course/deleteReply.ts"

export function deleteReplyApi(replyId: string ) {
    return request<deleteReplyResponseData>({
        url: `/reply/deleteById/${replyId}`,
        method: "delete"
    })
}

