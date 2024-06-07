import { ref } from "vue"
import { defineStore } from "pinia"


export const useIssueStore = defineStore("user", () => {
    const showTab = ref(0)

    const goView = () => {
        showTab.value = 0
    }







    return {  goView, showTab }
})


