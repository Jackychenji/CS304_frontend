import { request } from "@/utils/service.ts"

/** 获取课表 */
export function deleteConsultationByIdApi(consultationId: string) {
    return request({
        url: `/consultation/deleteById/${consultationId}`,
        method: "delete"
    })
}