import { ref } from "vue"
import { defineStore } from "pinia"


export const useIssueStore = defineStore("user", () => {
    const showTab = ref(0)

    const goIssue = () => {
        showTab.value = 0
    }







    return {  goIssue, showTab }
})


