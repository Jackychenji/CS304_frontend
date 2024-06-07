import {reactive, ref} from "vue"
import { defineStore } from "pinia"
import {ClassRequestData} from "@/api/types/Course/getClass.ts";


export const useClassStore = defineStore("class", () => {
    const showTab = ref(0)
    const classData = reactive<ClassRequestData[]>([])

    const goClass = () => {
        showTab.value = 0
    }







    return {  goClass, showTab, classData }
})


