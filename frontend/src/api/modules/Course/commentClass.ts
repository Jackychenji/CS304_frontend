import { request } from "@/utils/service.ts"
import {CommentClassResponseData,CommentClassRequestData} from "@/api/types/Course/commentClass.ts"

export function CommentPostApi(comment: CommentClassRequestData) {
    return request<CommentClassResponseData>({
        url: `/comment/addOne`,
        method: "post",
        data:comment
    })
}

