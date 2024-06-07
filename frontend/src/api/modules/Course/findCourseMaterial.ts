import { request } from "@/utils/service";  // 调整路径根据您的项目结构
import type * as Material from "../../types/Course/Material.ts"

export async function findCourseMaterialApi(data: string) {
    return request<Material.findCourseMaterialResponseData>({
        url: `/material/findCourseMaterial/${data}`,
        method: 'get'
    });
}
