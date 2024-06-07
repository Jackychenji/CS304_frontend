import { request } from "@/utils/service.ts"

/** 获取课表 */
export function deleteReservationByIdApi(reservationId: string) {
    return request({
        url: `/reservation/deleteById/${reservationId}`,
        method: "delete"
    })
}