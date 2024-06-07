import {consultationType} from "@/api/types/TutoringCounseling/consualtation.ts";

export interface addReservationRequestData {
    consultationId: string;
    reserveTime: string;
    userId: string;
}

export interface findReservationByUserIdResponseData {
    reservationConsultation: ReservationConsultation;
    reservationId: number;
    reserveTime: number;
    status: string;
}
export interface ReservationConsultation {
    availableTime: number[];
    consultant: string;
    consultationId: number;
    date: string;
    type: string;
}

export type reservationResponseData = ApiResponseData<{data:findReservationByUserIdResponseData}>
