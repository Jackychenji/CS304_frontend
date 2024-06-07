import { request } from "@/utils/service.ts"
import {deleteCommentResponseData} from "@/api/types/Course/deleteComment.ts"

export function deleteCommentApi(commentId: string ) {
    return request<deleteCommentResponseData>({
        url: `/comment/deleteById/${commentId}`,
        method: "delete"
    })
}

