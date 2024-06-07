import { request } from "@/utils/service.ts"
import {findReservationByUserIdResponseData} from "@/api/types/TutoringCounseling/reservation.ts";

/** 获取课表 */
export function findReservationByUserIdApi(userId: string) {
    return request<findReservationByUserIdResponseData>({
        url: `/reservation/findUserReservation/${userId}`,
        method: "get"
    })
}

