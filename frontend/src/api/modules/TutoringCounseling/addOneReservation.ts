import { request } from "@/utils/service";  // 调整路径根据您的项目结构

export async function addOneReservationApi(userId:string,consultationId: string, reserveTime: string) {
    return request({
        url: `/reservation/addOne/${userId}/${consultationId}/${reserveTime}`,
        method: 'get',
    });
}

