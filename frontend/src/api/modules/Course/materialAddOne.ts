import { request } from "@/utils/service";  // 调整路径根据您的项目结构
// import type * as Material from "../../types/Course/Material.ts";
import {MaterialAddOneRequestData} from "../../types/Course/Material.ts";

// const downloadMaterial = (MaterialDownloadRequestData) => {
//     const url = `/material/download/${MaterialDownloadRequestData}`;
//     window.open(url, '_blank');
// };

    export async function addOneMaterialApi(data: MaterialAddOneRequestData) {
    return request({
        url: '/material/addOne',
        method: 'post',
        data
    });
}

