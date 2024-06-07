import { request } from "@/utils/service.ts"
import {FollowResponseData} from "@/api/types/Course/FollowClass.ts"

/** 获取课表 */
export function FollowPostApi(userId:string,courseCode:string,operation:string) {
    return request<FollowResponseData>({
        url: `/course/followCourse/${userId}/${courseCode}/${operation}`,
        method: "get",
    })
}

