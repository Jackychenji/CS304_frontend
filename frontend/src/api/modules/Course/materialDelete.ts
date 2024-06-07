import { request } from "@/utils/service";  // 调整路径根据您的项目结构
// import type * as Material from "../../types/Course/Material.ts";

export function deleteMaterialApi(data: string) {
    return request({
        url: `/material/deleteById/${data}`,
        method: 'delete',
    });
}

