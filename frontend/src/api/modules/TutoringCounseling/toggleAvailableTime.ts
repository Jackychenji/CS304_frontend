import { request } from "@/utils/service.ts"

/** 获取课表 */
export function toggleAvailableTimeApi(consultationId: string, timeSlot: string) {
    return request<ApiResponseData<{}>>({
        url: `/consultation/toggleAvailableTime/${consultationId}/${timeSlot}`,
        // headers: {'Connection':'keep-alive'},
        method: "get"
    })
}