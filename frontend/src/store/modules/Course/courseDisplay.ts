import { ref } from "vue"
import { defineStore } from "pinia"


export const useCourseStore = defineStore("user", () => {
    const showTab = ref(0)

    const goCourse = () => {
        showTab.value = 0
    }







    return {  goCourse, showTab }
})


