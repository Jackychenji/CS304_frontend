import { request } from "@/utils/service.ts"
import {ReplyClassResponseData,ReplyClassRequestData} from "@/api/types/Course/replyClass.ts"

export function replyPostApi(reply: ReplyClassRequestData) {
    return request<ReplyClassResponseData>({
        url: `/reply/addOne`,
        method: "post",
        data:reply
    })
}

