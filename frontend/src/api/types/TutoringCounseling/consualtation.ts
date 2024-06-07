

export interface consultationType {
    availableTime: number[];
    consultant: string;
    consultationId: number;
    date: string;
    type: string;
}

/*"consultationId": 2,
    "type": "academic",
    "consultant": "zym",
    "date": "2024/05/02",
    "availableTime": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]*/


export interface addConsultationRequestData {
    /**
     * 咨询师
     */
    consultant: string;
    /**
     * 日期，String格式，日期具体以哪种格式看前后端协调
     */
    date: string;
    /**
     * 咨询类型，学业或者心理
     */
    type: string;
}

export type ConsultationResponseData = ApiResponseData<{data:consultationType}>

