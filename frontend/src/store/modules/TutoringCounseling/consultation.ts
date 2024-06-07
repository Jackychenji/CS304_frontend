import { reactive } from "vue"
import { defineStore } from "pinia"
import {consultationType} from "@/api/types/TutoringCounseling/consualtation.ts";
import {findAllConsultationApi} from "@/api/modules/TutoringCounseling/findAllConsultation.ts";
// import store from "@/store";


export const useConsultationStore = defineStore("consultation", () => {
    const consultationData = reactive<consultationType>({})

    const fetchConsultations = async () => {
        const apiData = await findAllConsultationApi()

        console.log(apiData)
        Object.keys(consultationData).forEach(key => {
            delete consultationData[key];
        });
        Object.assign(consultationData, apiData.data)
        console.log(consultationData)
    }

    return {consultationData, fetchConsultations}



})
