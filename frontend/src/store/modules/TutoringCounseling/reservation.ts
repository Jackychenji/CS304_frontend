import { reactive } from "vue"
import { defineStore } from "pinia"
import {findReservationByUserIdResponseData} from "@/api/types/TutoringCounseling/reservation.ts";
import {findReservationByUserIdApi} from "@/api/modules/TutoringCounseling/findUserReservation.ts";
// import store from "@/store";


export const useReservationStore = defineStore("reservation", () => {
    const reservationData = reactive<findReservationByUserIdResponseData>({})

    const fetchReservations = async (userId : string) => {
        const apiData = await findReservationByUserIdApi(userId)

        console.log(apiData)

        // 清空 courseData
        Object.keys(reservationData).forEach(key => {
            delete reservationData[key];
        });
        Object.assign(reservationData, apiData.data)
        console.log(reservationData)
    }

    return {reservationData, fetchReservations}



})
