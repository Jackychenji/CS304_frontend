import { request } from "@/utils/service.ts"
import {ConsultationResponseData} from "@/api/types/TutoringCounseling/consualtation.ts";

/** 获取课表 */
export function findAllConsultationApi() {
    return request<ConsultationResponseData>({
        url: `/consultation/findAll`,
        method: "get"
    })
}