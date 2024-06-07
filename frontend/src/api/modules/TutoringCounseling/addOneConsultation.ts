import { request } from "@/utils/service";  // 调整路径根据您的项目结构
import {addConsultationRequestData} from "@/api/types/TutoringCounseling/consualtation.ts";

export async function addOneConsultationApi(data: addConsultationRequestData) {
    return request({
        url: '/consultation/addOne',
        method: 'post',
        data
    });
}

