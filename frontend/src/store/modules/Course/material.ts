import { reactive } from "vue";
import { defineStore } from "pinia";
import { findCourseMaterialApi } from "@/api/modules/Course/findCourseMaterial.ts";

export const useMaterialStore = defineStore("material", () => {
    const courseData = reactive({});

    const fetchMaterial = async (courseCode: string) => {
        const apiData = await findCourseMaterialApi(courseCode);

        console.log(apiData);

        // 清空 courseData
        Object.keys(courseData).forEach(key => {
            delete courseData[key];
        });
        console.log(courseData)

        // 重新赋值
        Object.assign(courseData, apiData.data);
        console.log(courseData);
    };

    return { courseData, fetchMaterial };
});
