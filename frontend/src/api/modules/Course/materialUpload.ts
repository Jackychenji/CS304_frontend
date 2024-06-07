import { request } from "@/utils/service";  // 调整路径根据您的项目结构
// import type * as Material from "../../types/Course/Material.ts";
import {MaterialUploadRequestData} from "../../types/Course/Material.ts";

// const downloadMaterial = (MaterialDownloadRequestData) => {
//     const url = `/material/download/${MaterialDownloadRequestData}`;
//     window.open(url, '_blank');
// };

export async function uploadMaterialApi(data: MaterialUploadRequestData) {
    return request({
        url: '/material/upload',
        headers: {'Content-Type':'multipart/formdata'},
        method: 'post',
        data
    });
}

