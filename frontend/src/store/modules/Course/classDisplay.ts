import { ref,reactive } from "vue"
import { defineStore } from "pinia"

import {ClassRequestData} from "@/api/types/Course/getOneClass.ts";


export const useCourseStore = defineStore("user", () => {
    const showTab = ref(0)
    const classData = reactive<ClassRequestData[]>([])
    const goClass = () => {
        showTab.value = 0
    }







    return {  goClass, showTab, classData }
})


