import { fetchRecommendedCoursesApi } from "@/api/modules/Course/recommendation_class.ts";
import { Type } from "@/api/types/Course/recommendation_class.ts";
import { defineStore } from 'pinia';
export const useCoursesStore = defineStore('courses', {
    state: () => ({
        courseData: {} as Type,
        isLoading: false,
        error: null as Error | null,
    }),
    actions: {
        async fetchCourses(major: string) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await fetchRecommendedCoursesApi(major);
                console.log(response)
                // 确认API响应结构符合预期
                if (response && response.data && typeof response.data === 'object' && response.data !== null) {
                    this.courseData = response.data;
                } else {
                    // 如果数据结构不符合预期，抛出错误
                    throw new Error("Invalid data structure received from API");
                }
            } catch (error) {
                // 确保错误是一个 Error 类型
                if (error instanceof Error) {
                    this.error = error;
                } else {
                    this.error = new Error("An unknown error occurred");
                }
            } finally {
                this.isLoading = false;
            }
        }
    }
});