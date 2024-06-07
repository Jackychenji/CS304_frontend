import { request } from "@/utils/service";  // 调整路径根据您的项目结构
// import type * as Material from "../../types/Course/Material.ts";


export function downloadMaterialApi(data: string) {
    return request({
        url: `/material/download/${data}`,
        method: 'get',
    });
}

