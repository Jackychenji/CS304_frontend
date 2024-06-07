import { request } from "@/utils/service.ts"
import {ConsultationResponseData} from "@/api/types/TutoringCounseling/consualtation.ts";

/** 获取课表 */
export function findConsultationByIdApi(consultationId: string) {
    return request<ConsultationResponseData>({
        url: `/consultation/findById/${consultationId}`,
        method: "get"
    })
}